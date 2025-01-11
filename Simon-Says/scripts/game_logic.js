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

    pressKey(keyboard, code);
    if (keyboardKey) {
        clearKeysListeners();
        this.addEventListener(currentDeviceUp, keyUp);
    }
}

function keyUp(event) {
    const code = getKeyCode(event);

    if (keyboardKey === code) {
        releaseKey(keyboard, code);
        this.removeEventListener(currentDeviceUp, keyUp);
        startKeysListeners();
    }
}

function mouseOut(event) {
    const code = getKeyCode(event);

    if (currentDeviceUp === 'mouseup') {
        releaseKey(keyboard, code);
        keyboard.removeEventListener(currentDeviceUp, keyUp);
        startKeysListeners();
    }
}

function pressKey(keyboard, code) {
    for (const key of keyboard.children) {
        if (code === key.dataset.key) {
            key.classList.add('key__pressed');
            keyboardKey = code;
            break;
        }
    }
}

function releaseKey(keyboard, code) {
    for (const key of keyboard.children) {
        if (code === key.dataset.key) {
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
