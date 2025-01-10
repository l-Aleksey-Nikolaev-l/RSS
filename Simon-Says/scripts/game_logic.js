let keyboardKey = null;

function startKeysListeners() {
    const keyboard = document.getElementById('keyboard');
    let isMouseDown = false;
    let isKeyDown = false;

    document.addEventListener('keydown', (event) => {
        if (!isMouseDown && !isKeyDown) {
            isKeyDown = true;
            pressKey(keyboard, event.code);
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


function startNewGame() {
    console.log('Start new game');
}

function repeatGame() {
    console.log('Repeat game')
}


export  {startNewGame, repeatGame}
