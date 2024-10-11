import { writeFileSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const files = readdirSync("./src").filter((i) => i.endsWith(".ts"))
for (const name of files) {
  const metaPath = join("./src", name.replace(".ts", ".meta.js"))
  const jsPath = join("./es5", name.replace(".ts", ".js"))
  const meta = readFileSync(metaPath, "utf8")
  const js = readFileSync(jsPath, "utf8")

  writeFileSync(jsPath, [meta, js].join("\n\n"))
}

for (const name of readdirSync("./meta")) {
  const outPath = join("./es5", name)
  const srcPath = join("./meta", name)
  writeFileSync(outPath, readFileSync(srcPath))
}
