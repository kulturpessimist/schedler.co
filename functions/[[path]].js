import {
  CONTENT_SIGNAL_POLICY,
  MARKDOWN_PATH,
  buildLinkHeader,
  estimateMarkdownTokens,
  isHtmlRoute,
  mergeVary,
  siteRoutes,
  wantsMarkdown,
} from "../src/js/routes.js";

/**
 * Canonical slash-less route paths that have a generated static shell.
 *
 * @type {Set<string>}
 */
const ROUTE_PATHS = new Set(siteRoutes.map((route) => route.path));

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
 * Fetch an asset from the Pages asset bundle with the original request's
 * negotiation context.
 *
 * @param {Request} request
 * @param {{ ASSETS: { fetch: (request: Request) => Promise<Response> } }} env
 * @param {string} assetPath
 * @returns {Promise<Response>}
 */
const fetchAsset = async (request, env, assetPath) => {
  const assetUrl = new URL(assetPath, request.url);
  const assetRequest = new Request(assetUrl.toString(), request);
  return env.ASSETS.fetch(assetRequest);
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
  const assetResponse = await fetchAsset(request, env, MARKDOWN_PATH);
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
 * Permanently redirect the trailing-slash form of an HTML route to the
 * canonical slash-less URL. Query strings are preserved.
 *
 * @param {URL} url
 * @param {string} pathname
 * @returns {Response}
 */
const trailingSlashRedirect = (url, pathname) => {
  const target = new URL(pathname.replace(/\/+$/, "") + url.search, url);
  return Response.redirect(target.toString(), 301);
};

/**
 * Resolve the SPA shell for extension-less paths without a matching route:
 * impressum slideshow frames get the imprint shell, everything else falls
 * back to the start page shell so the client router can take over.
 *
 * @param {Request} request
 * @param {{ ASSETS: { fetch: (request: Request) => Promise<Response> } }} env
 * @param {string} pathname
 * @returns {Promise<Response>}
 */
const spaFallbackResponse = async (request, env, pathname) => {
  const shellPath = pathname.startsWith("/impressum/")
    ? "/impressum/index.html"
    : "/index.html";
  const shell = await fetchAsset(request, env, shellPath);

  if (shell.status !== 200) {
    return shell;
  }

  return withHtmlHeaders(
    new Response(shell.body, { status: 200, headers: shell.headers }),
    pathname,
  );
};

/**
 * Cloudflare Pages entrypoint.
 *
 * Serves every canonical slash-less route directly with HTTP 200 (bypassing
 * the directory redirect for `<route>/index.html` shells), redirects the
 * trailing-slash form with a single 301, and falls back to SPA shells for
 * client-side-only paths.
 *
 * @param {{
 *   request: Request;
 *   env: { ASSETS: { fetch: (request: Request) => Promise<Response> } };
 *   next: () => Promise<Response>;
 * }} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (wantsMarkdown(request.headers.get("accept")) && isHtmlRoute(pathname)) {
    return markdownResponse(request, env, pathname);
  }

  if (pathname !== "/" && pathname.endsWith("/") && isHtmlRoute(pathname)) {
    return trailingSlashRedirect(url, pathname);
  }

  if (pathname !== "/" && isHtmlRoute(pathname) && ROUTE_PATHS.has(pathname)) {
    const shell = await fetchAsset(request, env, `${pathname}/index.html`);

    if (shell.status === 200) {
      return withHtmlHeaders(shell, pathname);
    }
  }

  const response = await context.next();

  if (
    response.status === 404 &&
    isHtmlRoute(pathname) &&
    !pathname.includes(".")
  ) {
    return spaFallbackResponse(request, env, pathname);
  }

  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }

  return withHtmlHeaders(response, pathname);
}
