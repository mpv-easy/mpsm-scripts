import { PropertyNumber, addKeyBinding } from "@mpv-easy/tool";

const speed = new PropertyNumber("speed");
addKeyBinding(
	"MOUSE_BTN0",
	"MPV_EASY_SPEED",
	({ event }) => {
		switch (event) {
			case "down": {
				speed.value = 2;
				break;
			}
			case "up": {
				speed.value = 1;
				break;
			}
			case "press": {
				break;
			}
		}
	},
	{
		complex: true,
		repeatable: true,
		forced: false,
	},
);
