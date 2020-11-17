import { Vector } from "./Vector.js";
import { KeyboardListener, Keys } from "./KeyboardListener.js";
import { MouseListener } from "./MouseListener.js";

const keyboard: KeyboardListener = new KeyboardListener();
const mouse: MouseListener = new MouseListener();
let div: HTMLElement;

const update = (): void => {
    const test: boolean = keyboard.isKeyDown(Keys.W);
    if (test) {
        const test2: Vector = mouse.getRelativePosition(div);
        console.log(test2);
    }
    requestAnimationFrame(update);
}

const setup = (): void => {
    div = document.querySelector("#test") as HTMLElement;

    update();
}

window.addEventListener("load", setup);