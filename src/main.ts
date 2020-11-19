window.addEventListener("load", () => {
    const canvasElement: HTMLCanvasElement = document.querySelector("#game") as HTMLCanvasElement;
    new Game(canvasElement);
});