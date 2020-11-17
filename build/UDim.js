class UDim {
    constructor(scale, offset) {
        this._scale = scale;
        this._offset = offset;
    }
    get scale() {
        return this._scale;
    }
    get offset() {
        return this._offset;
    }
    set(scale, offset) {
        this._scale = scale || this._scale;
        this._offset = offset || this._offset;
    }
    add(u) {
        this._scale += u.scale;
        this._offset += u.offset;
    }
    sub(u) {
        this._scale -= u.scale;
        this._offset -= u.offset;
    }
}
class UDim2 {
    constructor(scaleX, offsetX, scaleY, offsetY) {
        this._x = new UDim(scaleX, offsetX);
        this._y = new UDim(scaleY, offsetY);
    }
    static fromScale(scaleX, scaleY) {
        return new UDim2(scaleX, 0, scaleY, 0);
    }
    static fromOffset(offsetX, offsetY) {
        return new UDim2(0, offsetX, 0, offsetY);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._x;
    }
    get height() {
        return this._y;
    }
    lerp(target, alpha) {
        const invertedAlpha = 1 - alpha;
        this._x.set(this._x.scale * invertedAlpha + target.x.scale * alpha, this._x.offset * invertedAlpha + target.x.offset * alpha);
        this._y.set(this._y.scale * invertedAlpha + target.y.scale * alpha, this._y.offset * invertedAlpha + target.y.offset * alpha);
    }
    add(u) {
        this._x.add(u.x);
        this._y.add(u.y);
    }
    sub(u) {
        this._x.sub(u.x);
        this._y.sub(u.y);
    }
}
export { UDim, UDim2 };
