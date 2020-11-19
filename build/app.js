class Color {
    constructor(red, green, blue, alpha) {
        this.r = Math.max(0, Math.min(255, Math.round(red)));
        this.g = Math.max(0, Math.min(255, Math.round(green)));
        this.b = Math.max(0, Math.min(255, Math.round(blue)));
        this.a = Math.max(0, Math.min(1, alpha));
    }
    lerp(target, alpha) {
        const invertA = 1 - alpha;
        this.r = this.r * invertA + target.r * alpha;
        this.g = this.g * invertA + target.g * alpha;
        this.b = this.b * invertA + target.b * alpha;
        this.a = this.a * invertA + target.a * alpha;
        return this;
    }
    static lerp(current, target, alpha) {
        const invertA = 1 - alpha;
        return Color.fromRGBa(current.r * invertA + target.r * alpha, current.g * invertA + target.g * alpha, current.b * invertA + target.b * alpha, current.a * invertA + target.a * alpha);
    }
    static fromRGB(red, green, blue) {
        return this.fromRGBa(red, green, blue, 1);
    }
    static fromRGBa(red, green, blue, alpha) {
        return new Color(red, green, blue, alpha);
    }
    static fromHSL(hue, saturation, lightness) {
        return this.fromHSLa(hue, saturation, lightness, 1);
    }
    static fromHSLa(hue, saturation, lightness, alpha) {
        saturation /= 100;
        lightness /= 100;
        const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = lightness - c / 2;
        let r = 0;
        let g = 0;
        let b = 0;
        const smallHue = Math.floor(hue / 60);
        switch (smallHue) {
            case 0:
                r = c;
                g = x;
                break;
            case 1:
                r = x;
                g = c;
                break;
            case 2:
                g = c;
                b = x;
                break;
            case 3:
                g = x;
                b = c;
                break;
            case 4:
                r = x;
                b = c;
                break;
            case 5:
                r = c;
                b = x;
                break;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return new Color(r, g, b, alpha);
    }
    toString() {
        return `rgba(${this.r}, ${this.b}, ${this.b}, ${this.a})`;
    }
}
class Game {
    constructor(canvas) {
        this.scenes = [];
        this.scene = 0;
        this.loop = (timestamp) => {
            const step = timestamp - this.previous;
            this.previous = timestamp;
            const scene = this.scenes[this.scene];
            scene.input();
            scene.update(step);
            scene.render();
            requestAnimationFrame(this.loop);
        };
        this.scenes.push(new Scene(canvas, 500, 500));
        this.previous = performance.now();
        requestAnimationFrame(this.loop);
    }
}
var Keys;
(function (Keys) {
    Keys["A"] = "KeyA";
    Keys["B"] = "KeyB";
    Keys["C"] = "KeyC";
    Keys["D"] = "KeyD";
    Keys["E"] = "KeyE";
    Keys["F"] = "KeyF";
    Keys["G"] = "KeyG";
    Keys["H"] = "KeyH";
    Keys["I"] = "KeyI";
    Keys["J"] = "KeyJ";
    Keys["K"] = "KeyK";
    Keys["L"] = "KeyL";
    Keys["M"] = "KeyM";
    Keys["N"] = "KeyN";
    Keys["O"] = "KeyO";
    Keys["P"] = "KeyP";
    Keys["Q"] = "KeyQ";
    Keys["R"] = "KeyR";
    Keys["S"] = "KeyS";
    Keys["T"] = "KeyT";
    Keys["U"] = "KeyU";
    Keys["V"] = "KeyV";
    Keys["W"] = "KeyW";
    Keys["X"] = "KeyX";
    Keys["Y"] = "KeyY";
    Keys["Z"] = "KeyZ";
    Keys["One"] = "Digit1";
    Keys["Two"] = "Digit2";
    Keys["Three"] = "Digit3";
    Keys["Four"] = "Digit4";
    Keys["Five"] = "Digit5";
    Keys["Six"] = "Digit6";
    Keys["Seven"] = "Digit7";
    Keys["Eight"] = "Digit8";
    Keys["Nine"] = "Digit9";
    Keys["Zero"] = "Digit0";
    Keys["Space"] = "Space";
    Keys["ShiftLeft"] = "ShiftLeft";
    Keys["ShiftRight"] = "ShiftRight";
    Keys["ControlLeft"] = "ControlLeft";
    Keys["ControlRight"] = "ControlRight";
    Keys["AltLeft"] = "AltLeft";
    Keys["AltRight"] = "AltRight";
    Keys["ArrowUp"] = "ArrowUp";
    Keys["ArrowRight"] = "ArrowRight";
    Keys["ArrowLeft"] = "ArrowLeft";
    Keys["ArrowDown"] = "ArrowDown";
})(Keys || (Keys = {}));
class KeyListener {
    constructor() {
        this.keyDown = (ev) => {
            if (ev.defaultPrevented) {
                return;
            }
            this.keyStates.set(ev.code, true);
        };
        this.keyUp = (ev) => {
            if (ev.defaultPrevented) {
                return;
            }
            this.keyStates.delete(ev.code);
        };
        this.keyStates = new Map();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(key) {
        return this.keyStates.get(key) !== undefined;
    }
}
class MouseListener {
    constructor() {
        this.mouseMove = (ev) => {
            this._x = ev.x;
            this._y = ev.y;
            this._target = ev.target;
        };
        this._x = 0;
        this._y = 0;
        window.addEventListener("mousemove", this.mouseMove);
    }
    get position() {
        return new Vector(this._x, this._y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get target() {
        return this._target;
    }
    getPositionOnElement(element) {
        const rect = element.getBoundingClientRect();
        const x = this.x - rect.left;
        const y = this.y - rect.top;
        return new Vector(x, y);
    }
    inArea(element, x, y, width, height) {
        const position = this.getPositionOnElement(element);
        return (position.x >= x && position.x <= x + width) && (position.y >= y && position.y <= y + height);
    }
}
class Scene {
    constructor(canvas, width, height) {
        this.rotation = 0;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.keyboard = new KeyListener();
        this.mouse = new MouseListener();
        this.canvas.width = width;
        this.canvas.height = height;
    }
    input() {
    }
    update(step) {
        this.fps = Math.floor(1000 / step + 0.5);
        const degreesPerSecond = 45;
        const deltaDegree = (step / 1000) * degreesPerSecond;
        this.rotation += deltaDegree;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "16px Comic Sans MS";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`FPS: ${this.fps}`, 0.92 * this.canvas.width, 0.05 * this.canvas.height);
        const mousePosition = this.mouse.getPositionOnElement(this.canvas);
        this.ctx.save();
        const origin = new Vector(this.canvas.width - 50, this.canvas.height * 0.5 - 50);
        this.ctx.textAlign = "right";
        this.ctx.translate(origin.x, origin.y);
        this.ctx.rotate(this.rotation / 180 * Math.PI);
        this.ctx.translate(-origin.x, -origin.y);
        this.ctx.fillText(`Mouse: (x: ${mousePosition.x}, y: ${mousePosition.y})`, 0.5 * this.canvas.width, 0.5 * this.canvas.height);
        this.ctx.restore();
    }
}
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
class Vector {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    static fromAngle(theta, magnitude = 1) {
        return new Vector(Math.cos(theta) * magnitude, Math.sin(theta) * magnitude);
    }
    static random() {
        return Vector.fromAngle(Math.random(), 1);
    }
    copy() {
        return new Vector(this._x, this._y);
    }
    get angle() {
        return Math.atan2(this._y, this._x);
    }
    set angle(radians) {
        const radius = this.magnitude;
        this._x = radius * Math.cos(radians);
        this._y = radius * Math.sin(radians);
    }
    get magnitude() {
        return Math.sqrt(this.magnitudeSq);
    }
    set magnitude(length) {
        const n = this.normalize();
        const result = n.mul(length);
        this._x = result._x;
        this._y = result._y;
    }
    get magnitudeSq() {
        return this._x * this._x + this._y * this._y;
    }
    normalize() {
        const m = this.magnitude;
        if (m !== 0) {
            this._x /= m;
            this._y /= m;
        }
        else {
            this._x = 0;
            this._y = 0;
        }
        return this;
    }
    add(v) {
        if (v instanceof Vector) {
            this._x += v._x;
            this._y += v._y;
        }
        else {
            this._x += v;
            this._y += v;
        }
        return this;
    }
    sub(v) {
        if (v instanceof Vector) {
            this._x -= v._x;
            this._y -= v._y;
        }
        else {
            this._x -= v;
            this._y -= v;
        }
        return this;
    }
    mul(v) {
        if (v instanceof Vector) {
            this._x *= v._x;
            this._y *= v._y;
        }
        else {
            this._x *= v;
            this._y *= v;
        }
        return this;
    }
    div(v) {
        if (v instanceof Vector) {
            if (v._x === 0 || v._y === 0) {
                throw new Error(Vector.DIV_ZERO_WARNING);
            }
            this._x /= v._x;
            this._y /= v._y;
        }
        else {
            if (v === 0) {
                throw new Error(Vector.DIV_ZERO_WARNING);
            }
            this._x /= v;
            this._y /= v;
        }
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    angleBetween(v) {
        const squareSum = this.magnitudeSq * v.magnitudeSq;
        return Math.acos((this.dot(v) * Math.sqrt(squareSum)) / squareSum);
    }
    rotate(radians) {
        this.angle += radians;
    }
    lerp(target, alpha) {
        this._x = this._x * (1 - alpha) + target._x * alpha;
        this._y = this._y * (1 - alpha) + target._y * alpha;
        return this;
    }
    distance(v) {
        return Vector.sub(this, v).magnitude;
    }
    equals(v) {
        return this.x === v.x && this.y === v.y;
    }
    toString() {
        return `X: ${this._x} Y: ${this._y}`;
    }
    static normalize(v) {
        return this.fromAngle(v.angle, 1);
    }
    static add(a, b) {
        if (a instanceof Vector) {
            if (b instanceof Vector) {
                return new Vector(a._x + b._x, a._y + b._y);
            }
            return new Vector(a._x + b, a._y + b);
        }
        else if (b instanceof Vector) {
            return new Vector(a + b._x, a + b._y);
        }
        return new Vector(a + b, a + b);
    }
    static sub(a, b) {
        if (a instanceof Vector) {
            if (b instanceof Vector) {
                return new Vector(a._x - b._x, a._y - b._y);
            }
            return new Vector(a._x - b, a._y - b);
        }
        else if (b instanceof Vector) {
            return new Vector(a - b._x, a - b._y);
        }
        return new Vector(a - b, a - b);
    }
    static mul(a, b) {
        if (a instanceof Vector) {
            if (b instanceof Vector) {
                return new Vector(a._x * b._x, a._y * b._y);
            }
            return new Vector(a._x * b, a._y * b);
        }
        else if (b instanceof Vector) {
            return new Vector(a * b._x, a * b._y);
        }
        return new Vector(a * b, a * b);
    }
    static div(a, b) {
        if (a instanceof Vector) {
            if (b instanceof Vector) {
                if (b._x === 0 || b._y === 0) {
                    throw new Error(Vector.DIV_ZERO_WARNING);
                }
                return new Vector(a._x / b._x, a._y / b._y);
            }
            if (b === 0) {
                throw new Error(Vector.DIV_ZERO_WARNING);
            }
            return new Vector(a._x / b, a._y / b);
        }
        else if (b instanceof Vector) {
            if (b._x === 0 || b._y === 0) {
                throw new Error(Vector.DIV_ZERO_WARNING);
            }
            return new Vector(a / b._x, a / b._y);
        }
        if (b === 0) {
            throw new Error(Vector.DIV_ZERO_WARNING);
        }
        return new Vector(a / b, a / b);
    }
    static lerp(current, target, alpha) {
        return new Vector(current._x * (1 - alpha) + target._x * alpha, current._y * (1 - alpha) + target._y * alpha);
    }
    static rotate(v, radians) {
        return Vector.fromAngle(v.angle + radians, v.magnitude);
    }
}
Vector.DIV_ZERO_WARNING = "Cannot divide by zero.";
window.addEventListener("load", () => {
    const canvasElement = document.querySelector("#game");
    new Game(canvasElement);
});
//# sourceMappingURL=app.js.map