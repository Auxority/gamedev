class MouseListener {
    private _x: number;
    private _y: number;
    private _target: EventTarget;

    public constructor() {
        this._x = 0;
        this._y = 0;
        window.addEventListener("mousemove", this.mouseMove);
    }

    /**
     * Gets the current x,y position of the mouse.
     */
    public get position(): Vector {
        return new Vector(this._x, this._y);
    }

    /**
     * Gets the current x position of the mouse.
     */
    public get x(): number {
        return this._x;
    }

    /**
     * Gets the current y position of the mouse.
     */
    public get y(): number {
        return this._y;
    }

    /**
     * Gets the current target if any.
     */
    public get target(): EventTarget {
        return this._target;
    }

    /**
     * @param element The canvas element.
     * Gets the position of the mouse on an element.
     */
    public getPositionOnElement(element: HTMLCanvasElement): Vector {
        const rect: DOMRect = element.getBoundingClientRect();
        const x: number = this.x - rect.left;
        const y: number = this.y - rect.top;
        return new Vector(x, y);
    }

    /**
     * Checks whether the mouse is within a given area.
     * @param element The canvas element.
     * @param x Left coordinate of the area.
     * @param y Top coordinate of the area.
     * @param width The width of the area.
     * @param height The height of the area.
     */
    public inArea(element: HTMLCanvasElement, x: number, y: number, width: number, height: number): boolean {
        const position = this.getPositionOnElement(element);
        return (position.x >= x && position.x <= x + width) && (position.y >= y && position.y <= y + height);
    }

    /**
     * Internal event which updates the x and y position when mouse movement is detected.
     */
    private mouseMove = (ev: MouseEvent): void => {
        this._x = ev.x;
        this._y = ev.y;
        this._target = ev.target;
    }
}