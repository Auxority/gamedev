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
    Keys["LeftShift"] = "ShiftLeft";
    Keys["RightShift"] = "ShiftRight";
    Keys["LeftCtrl"] = "ControlLeft";
    Keys["RightCtrl"] = "ControlRight";
    Keys["LeftAlt"] = "AltLeft";
    Keys["RightAlt"] = "AltRight";
})(Keys || (Keys = {}));
class KeyboardListener {
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
export { KeyboardListener, Keys };
