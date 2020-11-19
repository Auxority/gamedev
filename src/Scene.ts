class Scene {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private keyboard: KeyListener;
    private mouse: MouseListener;

    private rotation: number = 0;

    private fps: number;

    /**
     * Initializes the Scene
     * @param canvas The canvas where the game should be drawn on.
     * @param width The horizontal resolution of the canvas.
     * @param height The vertical resolution of the canvas.
     */
    public constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.keyboard = new KeyListener();
        this.mouse = new MouseListener();

        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Handles any user input that could be used in the update or render state.
     */
    public input(): void {

    }

    /**
     * Performs calculations for the scene which could be used in render.
     * @param step The time in milliseconds since the last update.
     */
    public update(step: number): void {
        this.fps = Math.floor(1000 / step + 0.5);
        const degreesPerSecond = 45;
        const deltaDegree = (step / 1000) * degreesPerSecond;
        this.rotation += deltaDegree;
    }

    /**
     * Draws the actual scene onto the canvas.
     */
    public render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "16px Comic Sans MS";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`FPS: ${this.fps}`, 0.92 * this.canvas.width, 0.05 * this.canvas.height);
        
        const mousePosition = this.mouse.getPositionOnElement(this.canvas);

        this.ctx.save();

        const origin: Vector = new Vector(this.canvas.width - 50, this.canvas.height * 0.5 - 50);

        this.ctx.textAlign = "right";
        this.ctx.translate(origin.x, origin.y);
        this.ctx.rotate(this.rotation / 180 * Math.PI);
        this.ctx.translate(-origin.x, -origin.y);
        this.ctx.fillText(`Mouse: (x: ${mousePosition.x}, y: ${mousePosition.y})`, 0.5 * this.canvas.width, 0.5 * this.canvas.height);

        this.ctx.restore();
    }
}