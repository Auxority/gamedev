interface GuiSettings {
    anchorPoint?: Vector,
    backgroundColor?: Color,
    borderColor?: Color,
    borderSize?: number,
    parent?: Gui, 
    position?: UDim2,
    rotation?: number,
    size?: UDim2,
    visible?: boolean,
    zIndex?: number
}

class Gui {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private canvas: HTMLCanvasElement;

    public anchorPoint: Vector;
    public backgroundColor: Color;
    public borderColor: Color;
    public borderSize: number;
    public parent: Gui;
    private _position: UDim2;
    public rotation: number;
    public _size: UDim2;
    public visible: boolean;
    public zIndex: number;

    public constructor(canvas: HTMLCanvasElement, settings: GuiSettings) {
        this.anchorPoint = settings.anchorPoint || new Vector(0, 0);
        this.backgroundColor = settings.backgroundColor || Color.fromRGB(255, 255, 255);
        this.borderColor = settings.borderColor || Color.fromRGB(0, 0, 0);
        this.borderSize = settings.borderSize || 0;
        this.parent = settings.parent;
        this._position = settings.position || new UDim2(0, 0, 0, 0);
        this.rotation = settings.rotation || 0;
        this._size = settings.size || new UDim2(0, 100, 0, 100);
        this.visible = settings.visible || true;
        this.zIndex = settings.zIndex || 0;
        this.canvas = canvas;

        this.update();
    }

    public update(): void {
        if (this.parent) {
            this._width = this.size.x.scale * this.parent.width + this.size.x.offset;
            this._height = this.size.y.scale * this.parent.height + this.size.y.offset;
            this._x = this.parent.x + this._position.x.scale * this.parent.width + this._position.x.offset - this.anchorPoint.x * this._width;
            this._y = this.parent.y + this._position.y.scale * this.parent.height + this._position.y.offset - this.anchorPoint.y * this._height;
        } else {
            this._width = this.size.x.scale * this.canvas.width + this.size.x.offset;
            this._height = this.size.y.scale * this.canvas.height + this.size.y.offset;
            this._x = this._position.x.scale * this.canvas.width + this._position.x.offset - this.anchorPoint.x * this._width;
            this._y = this._position.y.scale * this.canvas.height + this._position.y.offset - this.anchorPoint.y * this._height;
        }
    }

    public get position(): UDim2 {
        return this._position;
    }

    public set position(position: UDim2) {
        this._position = position;
        this.update();
    }

    public get size(): UDim2 {
        return this._size;
    }

    public set size(size: UDim2) {
        this._size = size;
        this.update();
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }
}