// @ts-check

import fs from "node:fs/promises";
import path from "node:path";
import { SITE_URL, absoluteUrl, sitemapPaths } from "../js/routes.js";

/** @type {string} */
const root = process.cwd();
/** @type {string} */
const publicDir = path.join(root, "public");
/** @type {string} */
const distDir = path.join(root, "dist");

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
  await fs.mkdir(target, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDir(sourcePath, targetPath);
      continue;
    }

    await Bun.write(targetPath, Bun.file(sourcePath));
  }
};

/**
 * Normalize icon paths in the generated web manifest to absolute paths.
 *
 * @returns {Promise<void>}
 */
const patchManifest = async () => {
  const manifestPath = path.join(distDir, "manifest.webmanifest");
  /** @type {WebManifest} */
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

  manifest.icons = (manifest.icons || []).map((icon) => ({
    ...icon,
    src: `/${String(icon.src).replace(/^\.?\//, "")}`,
  }));

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
};

/**
 * Patch generated HTML references to public asset URLs.
 *
 * @returns {Promise<void>}
 */
const patchIndex = async () => {
  const indexPath = path.join(distDir, "index.html");
  let html = await fs.readFile(indexPath, "utf8");

  html = html.replace(
    /(<meta property="og:image" content=")[^"]+(")/,
    '$1/images/social-card.png$2',
  );
  html = html.replace(
    /(<meta name="twitter:image" content=")[^"]+(")/,
    '$1/images/social-card.png$2',
  );
  html = html.replace(
    /(<link rel="icon" href=")[^"]+(" sizes="any")/,
    '$1/images/icon-32.png$2',
  );
  html = html.replace(
    /(<link rel="icon" href=")[^"]+(" type="image\/svg\+xml")/,
    '$1/images/icon.svg$2',
  );
  html = html.replace(
    /(<link rel="apple-touch-icon" href=")[^"]+(")/,
    '$1/images/icon-180.png$2',
  );
  html = html.replace(
    /(<link rel="manifest" href=")[^"]+(")/,
    '$1/manifest.webmanifest$2',
  );
  html = html.replace(
    /(<link rel="canonical" href=")[^"]+(")/,
    `$1${absoluteUrl("/")}$2`,
  );
  html = html.replace(
    /(<meta property="og:url" content=")[^"]+(")/,
    `$1${absoluteUrl("/")}$2`,
  );

  await fs.writeFile(indexPath, html);
};

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
    .replaceAll("'", "&apos;");
};

/**
 * Write the XML sitemap for the site's canonical routes.
 *
 * @returns {Promise<void>}
 */
const writeSitemap = async () => {
  const sitemapPath = path.join(distDir, "sitemap.xml");
  const urls = sitemapPaths
    .map((pathname) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(absoluteUrl(pathname))}</loc>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");

  await fs.writeFile(sitemapPath, sitemap);
};

/**
 * Inject the canonical host into the published robots.txt file.
 *
 * @returns {Promise<void>}
 */
const patchRobots = async () => {
  const robotsPath = path.join(distDir, "robots.txt");
  let robots = await fs.readFile(robotsPath, "utf8");

  robots = robots.replaceAll("{{SITE_URL}}", SITE_URL);

  await fs.writeFile(robotsPath, robots);
};

/**
 * Build step entrypoint.
 *
 * @returns {Promise<void>}
 */
async function main() {
  await copyDir(publicDir, distDir);
  await writeSitemap();
  await patchManifest();
  await patchIndex();
  await patchRobots();
  console.log("✅ Copied public assets");
}

await main();
