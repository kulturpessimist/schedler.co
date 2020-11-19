const { currentBranch, log } = require("isomorphic-git")
const fs = require("fs")

async function main() {
  console.log("⏳ Version/JSON...")
  console.log("")
  // get HEAD name...
  let branch = await currentBranch({
    fs,
    dir: "./",
  })
  // get history...
  let commits = await log({
    fs,
    dir: "./",
    ref: "HEAD",
  })
  // bring all together...
  const version = {
    version: `${process.env.npm_package_version}-${commits.length}`,
    drone: `${process.env.DRONE_BUILD_NUMBER || "local"}`,
    name: `${
      process.env.npm_package_config_sprintname || process.env.npm_package_name
    }`,
    semver: `${process.env.npm_package_version}`,
    count: `${commits.length}`,
    short: `${commits[0].oid.substr(0, 7)}`,
    long: `${commits[0].oid}`,
    branch: `${branch}`,
    update: `${new Date().toISOString()}`,
  }
  // do something with the data...
  if (process.argv[2]) {
    console.log("🖋  Writing", process.argv[2])
    const path = process.argv[2]
    fs.writeFileSync(path, JSON.stringify(version, null, 2))
    console.log("")
    console.log("✅ Created Version/JSON")
  } else {
    console.log(version)
    console.log("")
    console.log("✅ Shown Version/JSON")
  }
}
main()
