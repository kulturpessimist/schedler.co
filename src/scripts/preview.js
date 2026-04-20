// @ts-check

import path from "node:path";
import {
  CONTENT_SIGNAL_POLICY,
  MARKDOWN_PATH,
  buildLinkHeader,
  estimateMarkdownTokens,
  isHtmlRoute,
  mergeVary,
  wantsMarkdown,
} from "../js/routes.js";

/** @type {string} */
const distDir = path.join(process.cwd(), "dist");
/** @type {number} */
const port = Number(process.env.PORT || 4173);

/**
 * Add discovery and negotiation headers to HTML responses.
 *
 * @param {Response} response
 * @param {string} pathname
 * @returns {Response}
 */
const withHtmlHeaders = (response, pathname) => {
  const headers = new Headers(response.headers);

  headers.set("Vary", mergeVary(headers.get("Vary"), "Accept"));

  if (pathname === "/" || pathname === "/index.html") {
    headers.set("Link", buildLinkHeader("/"));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

/**
 * Serve the markdown representation for agent-friendly requests.
 *
 * @param {string} pathname
 * @returns {Promise<Response>}
 */
const markdownResponse = async (pathname) => {
  const markdownPath = path.join(distDir, MARKDOWN_PATH.slice(1));
  const markdown = await Bun.file(markdownPath).text();
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Signal": CONTENT_SIGNAL_POLICY,
    "x-markdown-tokens": String(estimateMarkdownTokens(markdown)),
  });

  headers.set("Vary", mergeVary(headers.get("Vary"), "Accept"));

  if (pathname === "/" || pathname === "/index.html") {
    headers.set("Link", buildLinkHeader("/"));
  }

  return new Response(markdown, {
    headers,
  });
};

/** @type {ReturnType<typeof Bun.serve>} */
const server = Bun.serve({
  port,
  /**
   * Serve static files from `dist` and fall back to `index.html` for routes.
   *
   * @param {Request} request
   * @returns {Promise<Response>}
   */
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") {
      pathname = "/index.html";
    }

    if (wantsMarkdown(request.headers.get("accept")) && isHtmlRoute(url.pathname)) {
      return markdownResponse(url.pathname);
    }

    const filePath = path.join(distDir, pathname.slice(1));
    const file = Bun.file(filePath);

    if (await file.exists()) {
      const response = new Response(file);

      return isHtmlRoute(url.pathname)
        ? withHtmlHeaders(response, url.pathname)
        : response;
    }

    if (!path.extname(pathname)) {
      const response = new Response(Bun.file(path.join(distDir, "index.html")), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });

      return withHtmlHeaders(response, url.pathname);
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Preview available at http://localhost:${server.port}`);
