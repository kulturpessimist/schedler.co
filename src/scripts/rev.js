// @ts-check

/** @type {typeof import("node:fs")} */
const fs = require("fs");

/**
 * @typedef {{
 *   name: string;
 *   version: string;
 * }} PackageInfo
 */

/** @type {PackageInfo} */
const pkg = require("../../package.json");

/**
 * Normalize Bun spawn output chunks to `Buffer`.
 *
 * @param {ArrayBufferLike | Uint8Array<ArrayBufferLike>} value
 * @returns {Buffer}
 */
const toBuffer = (value) => {
  return value instanceof Uint8Array
    ? Buffer.from(value)
    : Buffer.from(new Uint8Array(value));
};

/**
 * Run a git command and return trimmed stdout.
 *
 * @param {string[]} args
 * @returns {string}
 */
const runGit = (args) => {
  const result = Bun.spawnSync({
    cmd: ["git", ...args],
    stdout: "pipe",
    stderr: "pipe",
  });

  if (result.exitCode !== 0) {
    const message = toBuffer(result.stderr).toString("utf8").trim();
    throw new Error(message || `git ${args.join(" ")} failed`);
  }

  return toBuffer(result.stdout).toString("utf8").trim();
};

/**
 * Create and optionally write version metadata JSON.
 *
 * @returns {Promise<void>}
 */
async function main() {
  console.log("⏳ Version/JSON...");
  console.log("");

  const branch = runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
  const count = runGit(["rev-list", "--count", "HEAD"]);
  const short = runGit(["rev-parse", "--short=7", "HEAD"]);
  const long = runGit(["rev-parse", "HEAD"]);

  /** @type {{
   * version: string;
   * ci: string;
   * name: string;
   * semver: string;
   * count: string;
   * short: string;
   * long: string;
   * branch: string;
   * update: string;
   * }} */
  const version = {
    version: `${pkg.version}-${count}`,
    ci: `${process.env.DRONE_BUILD_NUMBER || "local"}`,
    name: `${pkg.name}`,
    semver: `${pkg.version}`,
    count: `${count}`,
    short,
    long,
    branch,
    update: `${new Date().toISOString()}`,
  };

  if (process.argv[2]) {
    console.log("🖋  Writing", process.argv[2]);
    fs.writeFileSync(process.argv[2], JSON.stringify(version, null, 2));
    console.log("");
    console.log("✅ Created Version/JSON");
  } else {
    console.log(version);
    console.log("");
    console.log("✅ Shown Version/JSON");
  }
}

main();
