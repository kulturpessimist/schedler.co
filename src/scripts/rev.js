const fs = require("fs");
const pkg = require("../../package.json");

const runGit = (args) => {
  const result = Bun.spawnSync({
    cmd: ["git", ...args],
    stdout: "pipe",
    stderr: "pipe",
  });

  if (result.exitCode !== 0) {
    const message = Buffer.from(result.stderr).toString("utf8").trim();
    throw new Error(message || `git ${args.join(" ")} failed`);
  }

  return Buffer.from(result.stdout).toString("utf8").trim();
};

async function main() {
  console.log("⏳ Version/JSON...");
  console.log("");

  const branch = runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
  const count = runGit(["rev-list", "--count", "HEAD"]);
  const short = runGit(["rev-parse", "--short=7", "HEAD"]);
  const long = runGit(["rev-parse", "HEAD"]);

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
