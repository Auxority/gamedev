class Game {
    private scenes: Scene[] = [];
    private scene: number = 0;
    private previous: number;
    private lag: number = 0;
    public static readonly MS_PER_UPDATE: number = 10;

    public constructor(canvas: HTMLCanvasElement) {
        this.scenes.push(new Scene(canvas, 500, 500));

        this.previous = performance.now();
        requestAnimationFrame(this.loop);
    }

    public loop = (current: number): void => {
        const elapsed: number = current - this.previous;
        this.previous = current;
        this.lag += elapsed;

        const scene: Scene = this.scenes[this.scene];
        
        scene.processInput();

        scene.update(elapsed);

        scene.render();

        requestAnimationFrame(this.loop);
    }
}