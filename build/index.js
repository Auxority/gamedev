import { KeyboardListener, Keys } from "./KeyboardListener.js";
import { MouseListener } from "./MouseListener.js";
const keyboard = new KeyboardListener();
const mouse = new MouseListener();
let div;
const update = () => {
    const test = keyboard.isKeyDown(Keys.W);
    if (test) {
        const test2 = mouse.getRelativePosition(div);
        console.log(test2);
    }
    requestAnimationFrame(update);
};
const setup = () => {
    div = document.querySelector("#test");
    update();
};
window.addEventListener("load", setup);
