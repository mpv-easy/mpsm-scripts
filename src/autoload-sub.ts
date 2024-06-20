import "@mpv-easy/polyfill";
import {
  isHttp,
  fetch,
  SubtitleTypes,
  getenv,
  getFileName,
  joinPath,
  writeFile,
  commandv,
  getPropertyNative,
  type TrackItem,
  existsSync,
  observeProperty,
  getProperty,
  registerEvent,
  mkdir,
} from "@mpv-easy/tool";

registerEvent("file-loaded", autoloadSub);
observeProperty("path", "string", autoloadSub);
registerEvent("start-file", autoloadSub);

export function autoloadSub() {
  const path = getProperty("path");
  if (!path?.length) {
    return;
  }

  const trackList = (getPropertyNative<TrackItem[]>("track-list") || []).filter(
    (i) => i.type === "sub",
  );
  if (isHttp(path)) {
    const list = SubtitleTypes.map((i) => {
      const s = path.split(".").slice(0, -1);
      s.push(i);
      return s.join(".");
    });
    const tmp = getenv("TMPDIR") || getenv("TMP") || getenv("tmp") || "./";
    for (const url of list) {
      const name = getFileName(url);
      if (!name?.length) {
        continue;
      }

      if (trackList.find((i) => i.title === name)) {
        continue;
      }

      try {
        const resp = fetch(url);

        if (resp.status !== 200 || !resp.text?.length) {
          continue;
        }

        const subPath = joinPath(tmp, name);
        writeFile(subPath, resp.text);
        commandv("sub-add", subPath);
      } catch (e) {
        mkdir("./aaaa");
      }
    }
  } else {
    const list = SubtitleTypes.map((i) => {
      const s = path.split(".").slice(0, -1);
      s.push(i);
      return s.join(".");
    });
    for (const url of list) {
      const name = getFileName(url);
      if (trackList.find((i) => i.title === name)) {
        continue;
      }
      if (existsSync(url)) {
        commandv("sub-add", url);
      }
    }
  }
}
