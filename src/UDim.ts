class UDim {
    private _scale: number;
    private _offset: number;

    public constructor(scale: number, offset: number) {
        this._scale = scale;
        this._offset = offset;
    }

    /**
     * The scale value from the UDim
     */
    public get scale() {
        return this._scale;
    }

    /**
     * The offset value from the UDim
     */
    public get offset() {
        return this._offset;
    }

    /**
     * Directly sets the UDim values.
     */
    public set(scale: number, offset: number) {
        this._scale = scale || this._scale;
        this._offset = offset || this._offset;
    }

    /**
     * Adds another UDim to this UDim.
     */
    public add(u: UDim) {
        this._scale += u.scale;
        this._offset += u.offset;
    }

    /**
     * Subtracts another UDim from this UDim.
     */
    public sub(u: UDim) {
        this._scale -= u.scale;
        this._offset -= u.offset;
    }
}

class UDim2 {
    private _x: UDim;
    private _y: UDim;

    public constructor(scaleX: number, offsetX: number, scaleY: number, offsetY: number) {
        this._x = new UDim(scaleX, offsetX);
        this._y = new UDim(scaleY, offsetY);
    }

    public static fromScale(scaleX: number, scaleY: number): UDim2 {
        return new UDim2(scaleX, 0, scaleY, 0);
    }

    public static fromOffset(offsetX: number, offsetY: number): UDim2 {
        return new UDim2(0, offsetX, 0, offsetY);
    }

    public get x(): UDim {
        return this._x;
    }
    
    public get y(): UDim {
        return this._y;
    }

    public get width(): UDim {
        return this._x;
    }

    public get height(): UDim {
        return this._y;
    }

    public lerp(target: UDim2, alpha: number): void {
        const invertedAlpha: number = 1 - alpha;
        this._x.set(this._x.scale * invertedAlpha + target.x.scale * alpha, this._x.offset * invertedAlpha + target.x.offset * alpha);
        this._y.set(this._y.scale * invertedAlpha + target.y.scale * alpha, this._y.offset * invertedAlpha + target.y.offset * alpha);
    }

    public add(u: UDim2) {
        this._x.add(u.x);
        this._y.add(u.y);
    }

    public sub(u: UDim2) {
        this._x.sub(u.x);
        this._y.sub(u.y);
    }
}