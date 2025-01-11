let keyCode = null;
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
    eventKey(event);
    if (!keyboardKey) {
        keyboardKey = keyCode;
        clearKeysListeners();
        this.addEventListener(currentDeviceUp, keyUp);
    }
}

function keyUp(event) {
    eventKey(event);
    if (keyCode) {
        keyboardKey = null;
        this.removeEventListener(currentDeviceUp, keyUp);
        startKeysListeners();
    }
}

function mouseOut(event) {
    if (currentDeviceUp === 'mouseup') {
        eventKey(event);
        keyboardKey = null;
        keyboard.removeEventListener(currentDeviceUp, keyUp);
        startKeysListeners();
    }
}

function eventKey(event) {
    const isDevicePressed = event.type.includes('down');
    keyCode = getKeyCode(event);

    if (!isDevicePressed && (keyboardKey !== keyCode)) {
        keyCode = null;
        return;
    }

    for (const key of keyboard.children) {
        if (keyCode === key.dataset.key && isDevicePressed) {
            key.classList.add('key__pressed');
            break;
        } else if (keyCode === key.dataset.key && !isDevicePressed) {
            key.classList.remove('key__pressed');
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
