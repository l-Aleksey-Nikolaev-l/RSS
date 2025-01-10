let keyboard = null;
let keyboardKey = null;

function startKeysListeners() {
    keyboard = document.getElementById('keyboard');
    let isMouseDown = false;
    let isKeyDown = false;


    keyboard.addEventListener('mouseout', (event) => {
        if (!isKeyDown && isMouseDown) {
            isMouseDown = false;
            releaseKey(keyboard, event.target.dataset.key.slice(-1));
        }
    });
    document.addEventListener('keydown', keyDown);
    keyboard.addEventListener('mousedown', keyDown);
}

function clearKeysListeners() {
    document?.removeEventListener('keydown', keyDown);
    keyboard?.removeEventListener('mousedown', keyDown);
}

function keyDown(event) {
}

function keyUp(event) {
}

function pressKey(keyboard, code) {
    if (keyboardKey) {
        return;
    }
    for (const key of keyboard.children) {
        if (code === key.dataset.key) {
            key.classList.add('key__pressed');
            keyboardKey = code;
            break;
        }
    }
}

function releaseKey(keyboard, code) {
    if (keyboardKey !== code) {
        return;
    }
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
    console.log('Repeat game');
}


export  {
    startNewGame,
    repeatGame
};
