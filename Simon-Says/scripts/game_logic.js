let keyboard = null;
let keyboardKey = null;
let currentDeviceUp = '';

function startKeysListeners() {
    clearKeysListeners();
    keyboard = document.getElementById('keyboard');
    document.addEventListener('keydown', keyDown);
    keyboard.addEventListener('mousedown', keyDown);
    keyboard.addEventListener('mouseout', mouseOut);
}

function clearKeysListeners() {
    document?.removeEventListener('keydown', keyDown);
    keyboard?.removeEventListener('mousedown', keyDown);
}

function getKeyCode(event) {
    return event.type.includes('key') ?
        event.code.slice(-1) :
        event.target.dataset.key;
}

function keyDown(event) {
    currentDeviceUp = event.type.includes('key') ? 'keyup' : 'mouseup';
    const code = getKeyCode(event);

    eventKey(keyboard, event, code);
    if (keyboardKey) {
        clearKeysListeners();
        this.addEventListener(currentDeviceUp, keyUp);
    }
}

function keyUp(event) {
    const code = getKeyCode(event);

    if (keyboardKey === code) {
        eventKey(keyboard, event, code);
        this.removeEventListener(currentDeviceUp, keyUp);
        startKeysListeners();
    }
}

function mouseOut(event) {
    const code = getKeyCode(event);

    if (currentDeviceUp === 'mouseup') {
        eventKey(keyboard, event, code);
        keyboard.removeEventListener(currentDeviceUp, keyUp);
        startKeysListeners();
    }
}

function eventKey(keyboard, event, code) {

    const isDevicePressed = event.type.includes('down');

    for (const key of keyboard.children) {
        if (code === key.dataset.key && isDevicePressed) {
            key.classList.add('key__pressed');
            keyboardKey = code;
            break;
        } else if (code === key.dataset.key && !isDevicePressed) {
            key.classList.remove('key__pressed');
            keyboardKey = null;
            break;
        }
    }
}

function startNewGame() {
    startKeysListeners();
}

function repeatGame() {
    startKeysListeners();
}


export  {
    startNewGame,
    repeatGame
};
