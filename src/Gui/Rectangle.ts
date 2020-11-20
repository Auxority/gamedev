/// <reference path="Gui.ts"/>

class Rectangle extends Gui {
    public constructor(canvas: HTMLCanvasElement, settings: GuiSettings) {
        super(canvas, settings);
    }

    private applyRotation(ctx: CanvasRenderingContext2D, gui: Gui) {
        const origin: Vector = new Vector(gui.x + 0.5 * gui.width, gui.y + 0.5 * gui.height);
        ctx.translate(origin.x, origin.y);
        ctx.rotate(gui.rotation * Math.PI / 180);
        ctx.translate(-origin.x, -origin.y);
    }

    private parentRotations(ctx: CanvasRenderingContext2D, parent: Gui): void {
        while (parent) {
            if (parent.rotation !== 0) {
                this.applyRotation(ctx, parent);
            }
            parent = parent.parent;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.visible === false) {
            return;
        }
        this.update();

        ctx.save();

        ctx.fillStyle = String(this.backgroundColor);
        ctx.strokeStyle = String(this.borderColor);
        ctx.lineWidth = this.borderSize;

        this.parentRotations(ctx, this.parent);
        if (this.rotation !== 0) {
            this.applyRotation(ctx, this);
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);

        // if (this.borderSize > 0) {
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke();
        // }
        
        ctx.restore();
    }
}