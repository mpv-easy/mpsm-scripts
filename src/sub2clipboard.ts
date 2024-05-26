import "@mpv-easy/polyfill";
import { setClipboard, print, observeProperty } from "@mpv-easy/tool";

observeProperty("sub-text", "string", (_, v) => {
  if (v) {
    setClipboard(v);
  }
});
