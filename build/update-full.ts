import { writeFileSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { Script } from "@mpv-easy/mpsm"

const META_DIR = "scripts"

const v: Record<string, Script> = {}
const md = ["## MPV Scripts:"]

for (const i of readdirSync(META_DIR)) {
  const p = join(META_DIR, i)
  const s = readFileSync(p, "utf8")
  const json = JSON.parse(s)
  v[json.name] = json

  md.push(`- [${json.name}](${json.homepage}): ${json.description}`)
}

writeFileSync("./scripts-full.json", JSON.stringify(v, null, 2))
writeFileSync("./scripts-full.md",md.join("\n"))
