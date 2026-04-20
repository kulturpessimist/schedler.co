import {
  CONTENT_SIGNAL_POLICY,
  MARKDOWN_PATH,
  buildLinkHeader,
  estimateMarkdownTokens,
  isHtmlRoute,
  mergeVary,
  wantsMarkdown,
} from "../src/js/routes.js";

/**
 * Add discovery headers to HTML responses.
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
 * Serve the site-wide markdown representation for agent requests.
 *
 * @param {Request} request
 * @param {{ ASSETS: { fetch: (request: Request) => Promise<Response> } }} env
 * @param {string} pathname
 * @returns {Promise<Response>}
 */
const markdownResponse = async (request, env, pathname) => {
  const assetUrl = new URL(MARKDOWN_PATH, request.url);
  const assetRequest = new Request(assetUrl.toString(), request);
  const assetResponse = await env.ASSETS.fetch(assetRequest);
  const markdown = await assetResponse.text();
  const headers = new Headers(assetResponse.headers);

  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Content-Signal", CONTENT_SIGNAL_POLICY);
  headers.set("x-markdown-tokens", String(estimateMarkdownTokens(markdown)));
  headers.set("Vary", mergeVary(headers.get("Vary"), "Accept"));

  if (pathname === "/" || pathname === "/index.html") {
    headers.set("Link", buildLinkHeader("/"));
  }

  return new Response(markdown, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers,
  });
};

/**
 * Cloudflare Pages entrypoint.
 *
 * @param {{
 *   request: Request;
 *   env: { ASSETS: { fetch: (request: Request) => Promise<Response> } };
 *   next: () => Promise<Response>;
 * }} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (
    wantsMarkdown(context.request.headers.get("accept")) &&
    isHtmlRoute(url.pathname)
  ) {
    return markdownResponse(context.request, context.env, url.pathname);
  }

  const response = await context.next();

  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }

  return withHtmlHeaders(response, url.pathname);
}
