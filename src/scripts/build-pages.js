const fs = require("fs/promises")

const path = "./src/txt/" /* process.argv[2] ||  */

const main = async () => {
  const filenames = await fs.readdir(path)

  for (const filename of filenames) {
    console.log(path + filename)
    if (filename.endsWith(".txt")) {
      const content = await fs.readFile(path + filename, "utf-8")
      await fs.writeFile(
        path + filename + ".js",
        `export default \`${content}\``
      )
      console.log(path + filename, content.length)
    }
  }
}

main()
