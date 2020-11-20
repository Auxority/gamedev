class MouseListener {
    private _canvas: HTMLCanvasElement;
    private _position: Vector;
    private _pressed: boolean;

    public constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._position = new Vector(0, 0);
        this._pressed = false;
        window.addEventListener("mousedown", this.mouseClick);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
    }

    /**
     * Gets the current x,y position of the mouse.
     */
    public get position(): Vector {
        return this._position;
    }

    /**
     * Gets the current x position of the mouse.
     */
    public get x(): number {
        return this._position.x;
    }

    /**
     * Gets the current y position of the mouse.
     */
    public get y(): number {
        return this._position.y;
    }

    /**
     * Checks if the mouse is pressed or not.
     */
    public get pressed(): boolean {
        return this._pressed;
    }

    /**
     * Internal event which updates the x and y position when mouse movement is detected.
     */
    private mouseMove = (ev: MouseEvent): void => {
        const rect: DOMRect = this._canvas.getBoundingClientRect();
        this._position.set(Math.round(ev.x - rect.left), Math.round(ev.y - rect.top));
    }

    /**
     * Internal event which updates when the mouse button is released.
     */
    private mouseUp = (ev: MouseEvent): void => {
        this._pressed = false;
    }

    /**
     * Internal event which updates when the mouse button is pressed.
     */
    private mouseClick = (ev: MouseEvent): void => {
        this._pressed = true;
    }
}