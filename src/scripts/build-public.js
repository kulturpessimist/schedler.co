// @ts-check

import fs from "node:fs/promises"
import path from "node:path"
import { desktopImpressumFrames, desktopPages } from "../js/content"
import {
  absoluteUrl,
  SITE_URL,
  sitemapPaths,
  siteRoutes,
  structuredDataForPath,
} from "../js/routes.js"

/** @type {string} */
const root = process.cwd()
/** @type {string} */
const publicDir = path.join(root, "public")
/** @type {string} */
const distDir = path.join(root, "dist")

/**
 * @typedef {{ src?: string, [key: string]: unknown }} WebManifestIcon
 */

/**
 * @typedef {{ icons?: WebManifestIcon[], [key: string]: unknown }} WebManifest
 */

/**
 * Copy all files and subdirectories recursively.
 *
 * @param {string} source
 * @param {string} target
 * @returns {Promise<void>}
 */
const copyDir = async (source, target) => {
  await fs.mkdir(target, { recursive: true })
  const entries = await fs.readdir(source, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name)
    const targetPath = path.join(target, entry.name)

    if (entry.isDirectory()) {
      await copyDir(sourcePath, targetPath)
      continue
    }

    await Bun.write(targetPath, Bun.file(sourcePath))
  }
}

/**
 * Escape text inserted into generated HTML.
 *
 * @param {string} value
 * @returns {string}
 */
const escapeHtml = (value) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/**
 * Resolve the static (desktop) page content for a route, injected into the
 * HTML shell so crawlers without JavaScript see the page text.
 *
 * @param {(typeof siteRoutes)[number]} route
 * @returns {string}
 */
const contentForRoute = (route) => {
  if (route.path === "/impressum") {
    return desktopImpressumFrames[0] || ""
  }
  if ("page" in route) {
    return desktopPages[route.page] || ""
  }
  return ""
}

/**
 * Render metadata and JSON-LD for one canonical SPA entrypoint.
 *
 * @param {string} template
 * @param {(typeof siteRoutes)[number]} route
 * @returns {string}
 */
const renderRouteHtml = (template, route) => {
  const pageUrl = absoluteUrl(route.path)
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)
  const structuredData = JSON.stringify(
    structuredDataForPath(route.path),
  ).replaceAll("<", "\\u003c")
  const content = contentForRoute(route)

  return template
    .replace(
      /(<pre v-html="current"><\/pre>)/,
      (match) => `${match}\n      <noscript><pre>${content}</pre></noscript>`,
    )
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta name="description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${description}$2`,
    )
    .replace(/(<link rel="canonical" href=")[^"]+("\s*\/?>)/, `$1${pageUrl}$2`)
    .replace(
      /(<meta property="og:url" content=")[^"]+("\s*\/?>)/,
      `$1${pageUrl}$2`,
    )
    .replace(
      /(<meta property="og:title"\s+content=")[^"]*("\s*\/?>)/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta property="og:description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta name="twitter:title"\s+content=")[^"]*("\s*\/?>)/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta name="twitter:description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${description}$2`,
    )
    .replace(
      /(<script id="structured-data" type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
      `$1${structuredData}$2`,
    )
}

/**
 * Verify the generated route head before writing it to disk.
 *
 * @param {string} html
 * @param {(typeof siteRoutes)[number]} route
 * @returns {void}
 */
const validateRouteHtml = (html, route) => {
  const pageUrl = absoluteUrl(route.path)
  const jsonLd = html.match(
    /<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1]

  if (!html.includes(`<link rel="canonical" href="${pageUrl}"`) || !jsonLd) {
    throw new Error(`Missing route metadata for ${route.path}`)
  }

  const graph = /** @type {Record<string, unknown>[]} */ (
    JSON.parse(jsonLd)["@graph"]
  )
  if (!graph.some((node) => node["@id"] === `${pageUrl}#webpage`)) {
    throw new Error(`Missing WebPage node for ${route.path}`)
  }
}

/**
 * Write one static HTML shell per canonical SPA route.
 *
 * @returns {Promise<void>}
 */
const writeRoutePages = async () => {
  const indexPath = path.join(distDir, "index.html")
  let template = await fs.readFile(indexPath, "utf8")

  template = template.replace(
    /(<meta property="og:image" content=")[^"]+(")/,
    `$1${absoluteUrl("/images/social-card.png")}$2`,
  )
  template = template.replace(
    /(<meta name="twitter:image" content=")[^"]+(")/,
    `$1${absoluteUrl("/images/social-card.png")}$2`,
  )

  for (const route of siteRoutes) {
    const html = renderRouteHtml(template, route)
    const outputPath =
      route.path === "/"
        ? indexPath
        : path.join(distDir, route.path.slice(1), "index.html")

    validateRouteHtml(html, route)
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, html)
  }
}

/**
 * Escape XML special characters in sitemap output.
 *
 * @param {string} value
 * @returns {string}
 */
const escapeXml = (value) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

/**
 * Load version metadata generated by the rev script.
 *
 * @returns {Promise<Record<string, string>>}
 */
const loadVersion = async () => {
  try {
    return JSON.parse(
      await fs.readFile(path.join(root, "src/version.json"), "utf8"),
    )
  } catch {
    return {}
  }
}

/**
 * Write the XML sitemap for the site's canonical routes.
 *
 * @param {string} [lastmod] ISO-8601 timestamp to emit as <lastmod>.
 * @returns {Promise<void>}
 */
const writeSitemap = async (lastmod) => {
  const sitemapPath = path.join(distDir, "sitemap.xml")
  const urls = sitemapPaths
    .map((pathname) => {
      const lines = [
        "  <url>",
        `    <loc>${escapeXml(absoluteUrl(pathname))}</loc>`,
      ]
      if (lastmod) {
        lines.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`)
      }
      lines.push("  </url>")
      return lines.join("\n")
    })
    .join("\n")

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n")

  await fs.writeFile(sitemapPath, sitemap)
}

/**
 * Inject the canonical host into the published robots.txt file.
 *
 * @returns {Promise<void>}
 */
const patchRobots = async () => {
  const robotsPath = path.join(distDir, "robots.txt")
  let robots = await fs.readFile(robotsPath, "utf8")

  robots = robots.replaceAll("{{SITE_URL}}", SITE_URL)

  await fs.writeFile(robotsPath, robots)
}

/**
 * Build step entrypoint.
 *
 * @returns {Promise<void>}
 */
async function main() {
  const version = await loadVersion()
  await copyDir(publicDir, distDir)
  await writeSitemap(version.update)
  await writeRoutePages()
  await patchRobots()
  console.log("✅ Copied public assets")
}

await main()
