import { Vector } from "./Vector.js";
class MouseListener {
    constructor() {
        this.mouseMove = (ev) => {
            if (ev.defaultPrevented) {
                return;
            }
            this.x = ev.x;
            this.y = ev.y;
        };
        this.x = 0;
        this.y = 0;
        window.addEventListener("mousemove", this.mouseMove);
    }
    getPosition() {
        return new Vector(this.x, this.y);
    }
    getRelativePosition(element) {
        const rect = element.getBoundingClientRect();
        const relX = (this.x - rect.left) / rect.width;
        const relY = (this.y - rect.top) / rect.height;
        return new Vector(relX, relY);
    }
}
export { MouseListener };
