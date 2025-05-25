import { writeFileSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { Script } from "@mpv-easy/mpsm"

const META_DIR = "scripts"

const v: Record<string, Script> = {}

for (const i of readdirSync(META_DIR)) {
  const p = join(META_DIR, i)
  const s = readFileSync(p, "utf8")
  const json = JSON.parse(s)
  v[json.name] = json
}

writeFileSync("./scripts-full.json", JSON.stringify(v))
