
import "@mpv-easy/polyfill"
import { setClipboard, print, observeProperty, } from "C:/wt/mpv-easy/mpv-tool"

observeProperty('sub-text', 'string', (_, v) => {
  if (v) {
    setClipboard(v)
  }
})
