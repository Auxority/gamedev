class Game {
    private scenes: Scene[] = [];
    private scene: number = 0;
    private previous: number;

    public constructor(canvas: HTMLCanvasElement) {
        this.scenes.push(new Scene(canvas, 500, 500));

        this.previous = performance.now();
        requestAnimationFrame(this.loop);
    }

    public loop = (timestamp: number): void => {
        const step: number = timestamp - this.previous;
        this.previous = timestamp;

        const scene: Scene = this.scenes[this.scene];
        
        scene.input();
        scene.update(step);
        scene.render();

        requestAnimationFrame(this.loop);
    }
}