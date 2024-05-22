import { PropertyNumber, addKeyBinding } from "@mpv-easy/tool";

const speed = new PropertyNumber("speed");

let mpvSpeed = speed.value;
let handle = 0;
const delay = 200
addKeyBinding(
  "MOUSE_BTN0",
  "MPV_EASY_SPEED",
  ({ event }) => {
    switch (event) {
      case "down": {
        mpvSpeed = speed.value

        handle = +setTimeout(() => {
          speed.value = mpvSpeed * 2;
        }, delay);

        break;
      }
      case "up": {
        speed.value = mpvSpeed
        clearTimeout(handle)
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
