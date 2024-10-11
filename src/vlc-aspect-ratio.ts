import "@mpv-easy/polyfill"

import {
  print,
  addKeyBinding,
  getPropertyNative,
  info,
  osdMessage,
  setProperty,
  setPropertyString,
  registerEvent,
} from "@mpv-easy/tool"

let arOption = 0

function hasVideo() {
  const trackList =
    getPropertyNative<{ type: string; selected: boolean; albumart: string }[]>(
      "track-list",
    )
  for (const i of trackList) {
    if (i.type === "video" && i.selected) {
      return !i.albumart
    }
  }
  return
}

function onPress() {
  if (!hasVideo()) {
    return
  }

  let arText = ""
  arOption = (arOption + 1) % 10

  const ar = [
    -1,
    "16:9",
    "4:3",
    "1:1",
    "16:10",
    "2.21:1",
    "2.35:1",
    "2.39:1",
    "5:4",
    0,
  ][arOption]

  if (typeof ar === "number") {
    if (ar === 0) {
      arText = "Force PAR 1:1"
    } else if (ar === -1) {
      arText = "Default"
    }
  } else {
    arText = ar.toString()
  }

  info(`Aspect Ratio: ${arText}`)
  osdMessage(`Aspect Ratio: ${arText}`)
  setPropertyString("video-aspect-override", ar.toString())
}

function cleanup() {
  print("Cleanup")
  arOption = 0
  setPropertyString("video-aspect-override", "-1")
  return true
}

addKeyBinding("a", "toggle_stretch", onPress)
registerEvent("file-loaded", cleanup)
