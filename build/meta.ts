import { writeFileSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { getScriptByLang, scriptToString } from "@mpv-easy/mpsm"

const files = readdirSync("./src")
for (const name of files) {
  const ext = name.endsWith(".ts") ? ".ts" : ".lua"
  const metaPath = join("./meta", name.replace(ext, ".meta.js"))
  const jsPath =
    ext === ".lua"
      ? join("./src", name)
      : join("./es5", name.replace(".ts", ".js"))
  const meta = readFileSync(metaPath, "utf8")
  const js = readFileSync(jsPath, "utf8")
  const metaTarget = metaPath.endsWith(".js") ? "js" : "lua"
  const fileTarget = name.endsWith(".js") ? "js" : "lua"
  const m = getScriptByLang(meta, metaTarget)!
  const metaString = scriptToString(m, fileTarget)
  writeFileSync(
    ext === ".lua" ? join("./es5", name) : jsPath,
    [metaString, js].join("\n\n"),
  )
}

for (const name of readdirSync("./meta")) {
  const outPath = join("./es5", name)
  const srcPath = join("./meta", name)
  writeFileSync(outPath, readFileSync(srcPath))
}
