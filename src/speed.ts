import { PropertyNumber, addKeyBinding } from "@mpv-easy/tool";
const speed = new PropertyNumber("speed");
let mpvSpeed = speed.value;

const steps = [
	{
		delay: 200,
		accelerate: 2,
	},
	{
		delay: 2000,
		accelerate: 4,
	},
];

const handleList = Array(steps.length).fill(0);

addKeyBinding(
	"MOUSE_BTN0",
	"MPV_EASY_SPEED",
	({ event }) => {
		switch (event) {
			case "down": {
				mpvSpeed = speed.value;

				for (let i = 0; i < steps.length; i++) {
					const { delay, accelerate } = steps[i];
					handleList[i] = +setTimeout(() => {
						speed.value = mpvSpeed * accelerate;
					}, delay);
				}

				break;
			}
			case "up": {
				speed.value = mpvSpeed;
				for (const handle of handleList) {
					clearTimeout(handle);
				}
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
