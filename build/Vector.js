class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static fromAngle(theta, magnitude = 1) {
        return new Vector(Math.cos(theta) * magnitude, Math.sin(theta) * magnitude);
    }
    static random() {
        return Vector.fromAngle(Math.random(), 1);
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    set angle(radians) {
        const radius = this.magnitude;
        this.x = radius * Math.cos(radians);
        this.y = radius * Math.sin(radians);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set magnitude(length) {
        const n = this.normalize();
        n.mul(length);
    }
    normalize() {
        const m = this.magnitude;
        if (m !== 0) {
            this.div(m);
        }
        else {
            throw new Error("Cannot divide by zero!");
        }
        return this;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    add(v) {
        if (v instanceof Vector) {
            this.x += v.x;
            this.y += v.y;
        }
        else {
            this.x += v;
            this.y += v;
        }
        return this;
    }
    sub(v) {
        if (v instanceof Vector) {
            this.x -= v.x;
            this.y -= v.y;
        }
        else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }
    mul(v) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        }
        else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }
    div(v) {
        if (v instanceof Vector) {
            if (v.x === 0 || v.y === 0) {
                throw new Error("Cannot divide by zero!");
            }
            this.x /= v.x;
            this.y /= v.y;
        }
        else {
            if (v === 0) {
                throw new Error("Cannot divide by zero!");
            }
            this.x /= v;
            this.y /= v;
        }
        return this;
    }
    dot(v) {
        return this.x * v.y + v.x * this.y;
    }
    cross(v) {
        return this.x * v.y - v.x * this.y;
    }
    rotate(degrees) {
        this.angle = degrees * Math.PI / 180;
    }
    lerp(target, alpha) {
        this.x = this.x * (1 - alpha) + target.x * alpha;
        this.y = this.y * (1 - alpha) + target.y * alpha;
        return this;
    }
    angleBetween(v) {
        return Math.acos((this.x * v.x + this.y * v.y) / (this.magnitude * v.magnitude));
    }
    distanceTo(v) {
        return new Vector(v.x - this.x, v.y - this.y).magnitude;
    }
    equals(v) {
        return this.x === v.x && this.y === v.y;
    }
    toString() {
        return `x: ${this.x}, y: ${this.y}`;
    }
}
export { Vector };
