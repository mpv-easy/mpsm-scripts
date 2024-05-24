import { autoload } from "@mpv-easy/autoload";
import { updatePlaylist, getMpvPlaylist, registerEvent } from "@mpv-easy/tool";

registerEvent("start-file", () => {
	autoload(updatePlaylist, getMpvPlaylist, {
		image: true,
		video: true,
		audio: true,
	});
});
