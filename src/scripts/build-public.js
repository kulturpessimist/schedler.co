// @ts-check

/** @type {typeof import("node:fs/promises")} */
const fs = require("fs/promises");
/** @type {typeof import("node:path")} */
const path = require("path");

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

  await fs.writeFile(indexPath, html);
};

/**
 * Build step entrypoint.
 *
 * @returns {Promise<void>}
 */
async function main() {
  await copyDir(publicDir, distDir);
  await patchManifest();
  await patchIndex();
  console.log("✅ Copied public assets");
}

main();
