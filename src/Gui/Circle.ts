/// <reference path="Gui.ts"/>

class Circle extends Gui {
    private startAngle: number;
    private endAngle: number;

    public constructor(canvas: HTMLCanvasElement, settings: GuiSettings, startAngle?: number, endAngle?: number) {
        super(canvas, settings);
        this.startAngle = startAngle || 0;
        this.endAngle = endAngle || 2 * Math.PI;
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

        ctx.beginPath();
        ctx.ellipse(this.x, this.y, 0.5 * this.width, 0.5 * this.height, this.rotation * Math.PI / 180, this.startAngle, this.endAngle);
        ctx.fill();
        if (this.borderSize > 0) {
            ctx.stroke();
        }

        ctx.restore();
    }
}