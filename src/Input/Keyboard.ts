enum Keys {
    A = "KeyA",
    B = "KeyB",
    C = "KeyC",
    D = "KeyD",
    E = "KeyE",
    F = "KeyF",
    G = "KeyG",
    H = "KeyH",
    I = "KeyI",
    J = "KeyJ",
    K = "KeyK",
    L = "KeyL",
    M = "KeyM",
    N = "KeyN",
    O = "KeyO",
    P = "KeyP",
    Q = "KeyQ",
    R = "KeyR",
    S = "KeyS",
    T = "KeyT",
    U = "KeyU",
    V = "KeyV",
    W = "KeyW",
    X = "KeyX",
    Y = "KeyY",
    Z = "KeyZ",
    One = "Digit1",
    Two = "Digit2",
    Three = "Digit3",
    Four = "Digit4",
    Five = "Digit5",
    Six = "Digit6",
    Seven = "Digit7",
    Eight = "Digit8",
    Nine = "Digit9",
    Zero = "Digit0",
    Space = "Space",
    ShiftLeft = "ShiftLeft",
    ShiftRight = "ShiftRight",
    ControlLeft = "ControlLeft",
    ControlRight = "ControlRight",
    AltLeft = "AltLeft",
    AltRight = "AltRight",
    ArrowUp = "ArrowUp",
    ArrowRight = "ArrowRight",
    ArrowLeft = "ArrowLeft",
    ArrowDown = "ArrowDown"
}

class KeyListener {
    private keyStates: Map<string, boolean>;

    public constructor() {
        this.keyStates = new Map();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }

    /**
     * Checks if a key is currently pressed.
     */
    public isKeyDown(key: string): boolean {
        return this.keyStates.get(key) !== undefined;
    }

    /**
     * Handles the keydown event and modifies the current keystates.
     */
    private keyDown = (ev: KeyboardEvent): void => {
        if (ev.defaultPrevented) {
            return;
        }
        this.keyStates.set(ev.code, true);
    }

    /**
     * Handles the keyup event and modifies the current keystates.
     */
    private keyUp = (ev: KeyboardEvent): void => {
        if (ev.defaultPrevented) {
            return;
        }
        this.keyStates.delete(ev.code);
    }
}