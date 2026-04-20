// @ts-check

/** @typedef {{ page: number, path: string }} CanonicalPageRoute */

/** @type {string} */
export const SITE_URL = "https://www.schedler.pro"
/** @type {string} */
export const MARKDOWN_PATH = "/llms.txt"
/** @type {string} */
export const SITEMAP_PATH = "/sitemap.xml"
/** @type {string} */
export const CONTENT_SIGNAL_POLICY = "ai-train=no, search=yes, ai-input=yes"

/** @type {CanonicalPageRoute[]} */
export const canonicalPageRoutes = [
  { page: 0, path: "/" },
  { page: 1, path: "/contact" },
  { page: 2, path: "/freelance" },
  { page: 3, path: "/jobs" },
  { page: 4, path: "/job/certania" },
  { page: 5, path: "/job/jd" },
  { page: 6, path: "/job/man-es" },
  { page: 7, path: "/job/iob" },
  { page: 8, path: "/job/thinxnet" },
  { page: 9, path: "/job/natureoffice" },
  { page: 10, path: "/job/dynomedia" },
  { page: 11, path: "/job/kigg" },
  { page: 12, path: "/education" },
  { page: 13, path: "/skills" },
]

/** @type {string[]} */
export const sitemapPaths = [
  ...canonicalPageRoutes.map((route) => route.path),
  "/impressum",
]

/**
 * @param {number} page
 * @returns {string}
 */
export const canonicalPathForPage = (page) => {
  return canonicalPageRoutes.find((route) => route.page === page)?.path || "/"
}

/**
 * @param {string} pathname
 * @returns {string}
 */
export const absoluteUrl = (pathname) => {
  return new URL(pathname, SITE_URL).toString()
}

/**
 * @param {string | null | undefined} acceptHeader
 * @returns {boolean}
 */
export const wantsMarkdown = (acceptHeader) => {
  return (acceptHeader || "").toLowerCase().includes("text/markdown")
}

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export const isHtmlRoute = (pathname) => {
  if (pathname === "/" || pathname.endsWith(".html")) {
    return true
  }

  return !/\/[^/]+\.[^/]+$/.test(pathname)
}

/**
 * @param {string} markdown
 * @returns {number}
 */
export const estimateMarkdownTokens = (markdown) => {
  return Math.max(1, Math.ceil(markdown.length / 4))
}

/**
 * @param {string | null | undefined} existing
 * @param {string} value
 * @returns {string}
 */
export const mergeVary = (existing, value) => {
  const parts = new Set(
    (existing || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  )

  parts.add(value)

  return [...parts].join(", ")
}

/**
 * @param {string} [pathname]
 * @returns {string}
 */
export const buildLinkHeader = (pathname = "/") => {
  const links = [
    `<${pathname}>; rel="alternate"; type="text/markdown"`,
    `<${MARKDOWN_PATH}>; rel="service-doc"; type="text/markdown"`,
  ]

  return links.join(", ")
}
