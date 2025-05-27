import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { Script, scriptToString } from "@mpv-easy/mpsm"

let txt = await fetch(
  "https://raw.githubusercontent.com/stax76/awesome-mpv/main/README.md",
).then((i) => i.text())

txt = txt.slice(txt.indexOf("# User Script"), txt.indexOf("# Shaders"))

const GITHUB_RE =
  /^https?:\/\/(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/

const branchCache: Record<string, string> = {}
const urlCache: Record<string, Script> = {}

async function parseMarkdownLink(markdown: string): Promise<Script | null> {
  const regex = /\[(.*?)\]\((.*?)\)\s*-\s*(.*)/
  const match = markdown.match(regex)

  if (!match) {
    return null
  }

  const [, title, url, description] = match.map((i) => i.trim())
  let author = ""
  let download = url
  for (const i of [
    "https://github.com/",
    "https://gist.github.com/",
    // TODO: support other sites
    // "https://gitlab.com/",
    // "https://codeberg.org/",
  ]) {
    if (url.startsWith(i)) {
      author = url.slice(i.length).split("/")[0] || ""
    } else {
      continue
    }

    if (url.endsWith(".lua") || url.endsWith(".js")) {
      if (url.startsWith("https://github.com/")) {
        const regex =
          /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/
        const match = url.match(regex)
        if (!match) {
          continue
        }
        const [, user, repo, branch, path] = match
        download = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`
      }
    } else if (GITHUB_RE.test(url)) {
      const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/)?$/
      const match = url.match(regex)

      if (!match) {
        continue
      }
      const [, user, repo] = match

      const mainUrl = `https://github.com/${user}/${repo}/archive/refs/heads/main.zip`
      const masterUrl = `https://github.com/${user}/${repo}/archive/refs/heads/master.zip`
      if (branchCache[url]) {
        download = branchCache[url]
      } else {
        if ((await fetch(mainUrl)).status === 200) {
          download = mainUrl
        } else {
          download = masterUrl
        }
        branchCache[url] = download
      }
    }
  }

  return {
    name: title,
    homepage: url,
    download,
    description: description,
    author,
  }
}

if (!existsSync("./public/meta")) {
  mkdirSync("./public/meta", { recursive: true })
}

for (let line of txt
  .replaceAll("\r\n", "\n")
  .split("\n")
  .map((i) => i.trim())) {
  if (line.startsWith("- ")) {
    line = line.slice(2)
    const data = urlCache[line] ? urlCache[line] : await parseMarkdownLink(line)
    urlCache[line] = data!
    if (data) {
      const s = scriptToString(data!, "js")
      writeFileSync(`./meta/${data.name.replaceAll("/", "_")}.meta.js`, s)
    }
  }
}
