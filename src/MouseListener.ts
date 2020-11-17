import { Vector } from "./Vector.js";

class MouseListener {
    private x: number;
    private y: number;

    public constructor() {
        this.x = 0;
        this.y = 0;
        window.addEventListener("mousemove", this.mouseMove);
    }

    /**
     * Gets the current x,y position of the mouse on the screen.
     */
    public getPosition(): Vector {
        return new Vector(this.x, this.y);
    }

    /**
     * Gets the relative x,y position of the mouse on an element.
     */
    public getRelativePosition(element: HTMLElement): Vector {
        const rect: DOMRect = element.getBoundingClientRect();
        const relX: number = (this.x - rect.left) / rect.width;
        const relY: number = (this.y - rect.top) / rect.height;
        return new Vector(relX, relY);
    }

    /**
     * Internal event which updates the x and y position when mouse movement is detected.
     */
    private mouseMove = (ev: MouseEvent): void => {
        this.x = ev.x;
        this.y = ev.y;
    }
}

export { MouseListener };