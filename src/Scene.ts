class Scene {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private keyboard: KeyListener;
    private mouse: MouseListener;

    private someColor: Color = Color.fromRGBa(25, 255, 150, 1);
    private anotherColor: Color = Color.fromRGBa(25, 150, 255, 1);
    private color: string = "#ffffff";
    private alpha: number = 0;
    private fps: number = 0;

    private elements: Array<Rectangle | Circle> = [];

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
        this.mouse = new MouseListener(canvas);

        this.canvas.width = width;
        this.canvas.height = height;

        // Initialize objects here

        this.elements.push(new Rectangle(this.canvas, {
            anchorPoint: new Vector(0.5, 0.5),
            size: new UDim2(0.5, 0, 0.5, 0),
            position: new UDim2(0.5, 0, 0.5, 0),
            backgroundColor: Color.fromHSL(200, 100, 50),
            zIndex: 0
        }));

        this.elements.push(new Rectangle(this.canvas, {
            anchorPoint: new Vector(0.5, 0.5),
            size: new UDim2(0.5, 0, 0.5, 0),
            position: new UDim2(0.5, 0, 0.5, 0),
            backgroundColor: Color.fromHSL(1, 100, 50),

        }));
    
        for (let i: number = 0; i < 25; i++) {
            this.elements.push(new Rectangle(this.canvas, {
                anchorPoint: new Vector(0.5, 0.5),
                size: new UDim2(0.95, 0, 0.95, 0),
                position: new UDim2(0.5, 0, 0.5, 0),
                backgroundColor: Color.fromHSL(i/25 * 360, 100, 50),
                parent: this.elements[this.elements.length - 1]
            }));
        }

    }

    /**
     * Handles any user input that could be used in the update or render state.
     */
    public processInput(): void {
        if (this.keyboard.isKeyDown(Keys.ArrowRight)) {
            this.alpha = Math.max(0, Math.min(1, this.alpha + 0.05));
        }
        if (this.keyboard.isKeyDown(Keys.ArrowLeft)) {
            this.alpha = Math.max(0, Math.min(1, this.alpha - 0.05));
        }
    }

    /**
     * Performs calculations for the scene which could be used in render.
     * Example:
     * const degreesPerSecond: number = 180;
     * const deltaDegree: number = (elapsed / 1000) * degreesPerSecond;
     * this.rotation += deltaDegree;
     * @param elapsed The time in milliseconds since the last update.
     */
    public update(elapsed: number): void {
        this.fps = Math.round(1000 / elapsed);
        this.elements.sort((a: Gui, b: Gui) => {
            return a.zIndex - b.zIndex;
        });
        if (this.mouse.pressed) {
            this.elements.forEach((element: Rectangle | Circle) => {
                element.rotation += 1;
            });
        }
        this.color = String(Color.lerp(this.someColor, this.anotherColor, this.alpha));
    }

    /**
     * Draws the actual scene onto the canvas.
     */
    public render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.elements.forEach((element: Rectangle | Circle, i: number) => {
            element.draw(this.ctx);
        });

        this.ctx.font = "16px Comic Sans MS";
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = "center";
        this.ctx.save();
        this.ctx.fillText(`FPS: ${this.fps}`, 0.92 * this.canvas.width, 0.05 * this.canvas.height);
        this.ctx.restore();
        
        // const mousePosition: Vector = this.mouse.position;
        // const origin: Vector = new Vector(0.98 * this.canvas.width, 0.1 * this.canvas.height);

        // this.ctx.save();
        // this.ctx.textAlign = "right";
        // this.ctx.fillText(`Mouse: (x: ${mousePosition.x}, y: ${mousePosition.y})`, origin.x, origin.y);
        // this.ctx.restore();
    }
}