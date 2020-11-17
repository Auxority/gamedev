class Vector {
    public x: number;
    public y: number;

    /**
     * Creates a new vector.
     * @param x x-component of the vector.
     * @param y y-component of the vector.
     */
    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a new vector from an angle.
     * @param theta The angle of the vector in radians.
     * @param magnitude The length of the vector.
     */
    public static fromAngle(theta: number, magnitude: number = 1) {
        return new Vector(Math.cos(theta) * magnitude, Math.sin(theta) * magnitude);
    }

    /**
     * Creates a new random vector.
     */
    public static random() {
        return Vector.fromAngle(Math.random(), 1);
    }

    /**
     * Copies the vector.
     */
    public copy(): Vector {
        return new Vector(this.x, this.y);
    }

    /**
     * Calculates the angle of the vector.
     */
    private get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Sets the x- and y-component of the vector based on the angle.
     */
    private set angle(radians: number) {
        const radius: number = this.magnitude;
        this.x = radius * Math.cos(radians);
        this.y = radius * Math.sin(radians);
    }

    /**
     * Calculates the length of the current vector.
     */
    public get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Sets the length of the current vector.
     */
    public set magnitude(length: number) {
        const n: Vector = this.normalize();
        n.mul(length);
    }

    /**
     * Normalizes the current vector.
     */
    public normalize(): Vector {
        const m: number = this.magnitude;
        if (m !== 0) {
            this.div(m);
        } else {
            throw new Error("Cannot divide by zero!");
        }
        return this;
    }

    /**
     * Directly sets the x- and y-component of the vector. 
     * @param x x-component of the vector.
     * @param y y-component of the vector.
     */
    public set(x: number, y: number): Vector {
        this.x = x;
        this.y = y;
        return this;
    }

    public add(v: Vector | number): Vector {
        if (v instanceof Vector) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
        return this;
    }

    public sub(v: Vector | number): Vector {
        if (v instanceof Vector) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }

    public mul(v: Vector | number): Vector {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }

    public div(v: Vector | number): Vector {
        if (v instanceof Vector) {
            if (v.x === 0 || v.y === 0) {
                throw new Error("Cannot divide by zero!");
            }
            this.x /= v.x;
            this.y /= v.y;
        } else {
            if (v === 0) {
                throw new Error("Cannot divide by zero!");
            }
            this.x /= v;
            this.y /= v;
        }
        return this;
    }

    public dot(v: Vector): number {
        return this.x * v.y + v.x * this.y;
    }

    public cross(v: Vector): number {
        return this.x * v.y - v.x * this.y;
    }

    public rotate(degrees: number) {
        this.angle = degrees * Math.PI / 180;
    }

    public lerp(target: Vector, alpha: number): Vector {
        this.x = this.x * (1 - alpha) + target.x * alpha;
        this.y = this.y * (1 - alpha) + target.y * alpha;
        return this;
    }

    public angleBetween(v: Vector): number {
        return Math.acos((this.x * v.x + this.y * v.y) / (this.magnitude * v.magnitude));
    }

    public distanceTo(v: Vector): number {
        return new Vector(v.x - this.x, v.y - this.y).magnitude;
    }

    public equals(v: Vector): boolean {
        return this.x === v.x && this.y === v.y;
    }

    public toString(): string {
        return `x: ${this.x}, y: ${this.y}`;
    }
}

export { Vector };