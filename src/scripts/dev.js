// @ts-check

import { watch } from "node:fs";
import path from "node:path";

/** @type {string} */
const cwd = process.cwd();
/** @type {string} */
const srcDir = path.join(cwd, "src");
/** @type {Set<string>} */
const generatedFiles = new Set([
  path.join(srcDir, "txt", "desktop.js"),
  path.join(srcDir, "txt", "mobile.js"),
  path.join(srcDir, "version.json"),
]);

/** @type {ReturnType<typeof setTimeout> | null} */
let rebuildTimer = null;
/** @type {boolean} */
let buildInProgress = false;
/** @type {string | null} */
let pendingReason = null;

/**
 * Normalize fs watch filenames to plain strings.
 *
 * @param {string | Buffer | null | undefined} value
 * @returns {string | null}
 */
const normalizeWatchedPath = (value) => {
  if (typeof value === "string") {
    return value;
  }

  return value instanceof Buffer ? value.toString("utf8") : null;
};

/**
 * Run a Bun command and stream output to the terminal.
 *
 * @param {string[]} cmd
 * @returns {Promise<void>}
 */
const runCommand = async (cmd) => {
  const process = Bun.spawn({
    cmd,
    cwd,
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });

  const exitCode = await process.exited;
  if (exitCode !== 0) {
    throw new Error(`${cmd.join(" ")} failed with exit code ${exitCode}`);
  }
};

/**
 * Rebuild generated source artifacts.
 *
 * @param {string} reason
 * @returns {Promise<void>}
 */
const rebuildDerivedSources = async (reason) => {
  if (buildInProgress) {
    pendingReason = reason;
    return;
  }

  buildInProgress = true;

  try {
    console.log(`\n[dev] Rebuilding generated sources (${reason})`);
    await runCommand([process.execPath, "./src/scripts/rev.js", "./src/version.json"]);
    await runCommand([process.execPath, "./src/scripts/build-pages.js"]);
  } catch (error) {
    console.error("[dev] Rebuild failed");
    console.error(error);
  } finally {
    buildInProgress = false;

    if (pendingReason) {
      const queuedReason = pendingReason;
      pendingReason = null;
      await rebuildDerivedSources(queuedReason);
    }
  }
};

/**
 * Determine whether a changed path needs the derived sources rebuilt.
 *
 * @param {string | Buffer | null | undefined} changedPath
 * @returns {boolean}
 */
const shouldRebuildDerivedSources = (changedPath) => {
  const relativePath = normalizeWatchedPath(changedPath);

  if (!relativePath) {
    return false;
  }

  const absolutePath = path.normalize(path.join(srcDir, relativePath));

  if (generatedFiles.has(absolutePath)) {
    return false;
  }

  const normalizedRelativePath = path.relative(srcDir, absolutePath);

  if (normalizedRelativePath.startsWith("..")) {
    return false;
  }

  return (
    normalizedRelativePath === path.join("scripts", "build-pages.js") ||
    normalizedRelativePath === path.join("scripts", "rev.js") ||
    (normalizedRelativePath.startsWith(`txt${path.sep}`) &&
      normalizedRelativePath.endsWith(".txt"))
  );
};

await rebuildDerivedSources("startup");

const devServer = Bun.spawn({
  cmd: [process.execPath, "./src/index.html", "--watch"],
  cwd,
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

console.log("[dev] Watching src/ for changes");

const watcher = watch(
  srcDir,
  {
    recursive: true,
  },
  (_eventType, filename) => {
    if (!shouldRebuildDerivedSources(filename)) {
      return;
    }

    const label = normalizeWatchedPath(filename);

    if (rebuildTimer) {
      clearTimeout(rebuildTimer);
    }

    rebuildTimer = setTimeout(() => {
      rebuildTimer = null;
      void rebuildDerivedSources(label || "src change");
    }, 75);
  },
);

/**
 * Shut down child processes and file watchers.
 *
 * @returns {Promise<void>}
 */
const shutdown = async () => {
  watcher.close();

  if (rebuildTimer) {
    clearTimeout(rebuildTimer);
    rebuildTimer = null;
  }

  devServer.kill();
  await devServer.exited;
};

process.on("SIGINT", () => {
  void shutdown().finally(() => process.exit(0));
});

process.on("SIGTERM", () => {
  void shutdown().finally(() => process.exit(0));
});

const serverExitCode = await devServer.exited;
watcher.close();
process.exit(serverExitCode);
