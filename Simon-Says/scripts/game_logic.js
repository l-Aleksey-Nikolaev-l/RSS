let keyboard = null;
let keyboardKey = null;

function startKeysListeners() {
    keyboard = document.getElementById('keyboard');
    let isMouseDown = false;
    let isKeyDown = false;

    document.addEventListener('keydown', (event) => {
        if (!isMouseDown && !isKeyDown) {
            isKeyDown = true;
            pressKey(keyboard, event.code.slice(-1));
        }
    });

    document.addEventListener('keyup', (event) => {
        if (!isMouseDown) {
            isKeyDown = false;
            releaseKey(keyboard, event.code.slice(-1));
        }
    });

    keyboard.addEventListener('mousedown', (event) => {
        if (!isMouseDown && !isKeyDown) {
            isMouseDown = true;
            pressKey(keyboard, event.target.dataset.key.slice(-1));
        }
    });

    keyboard.addEventListener('mouseup', (event) => {
        if (!isKeyDown) {
            isMouseDown = false;
            releaseKey(keyboard, event.target.dataset.key.slice(-1));
        }
    });

    keyboard.addEventListener('mouseout', (event) => {
        if (!isKeyDown && isMouseDown) {
            isMouseDown = false;
            releaseKey(keyboard, event.target.dataset.key.slice(-1));
        }
    });
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
