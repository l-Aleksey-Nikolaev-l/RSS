import {
    difficulty,
    keysCollection,
    timeForShowing,
    timeBetweenShows
} from './variables.js';

let keyCode = null;
let keyboard = null;
let keyboardKey = null;
let currentDeviceUp = '';

let directSequence = [];
let randomSequence = [];
let randomSequenceLength = 2;
let indexOfSymbol = 0;

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

function createSequence() {
    const numeric = [48, 57]; // from 0 to 9
    const letters = [65, 90]; // from A to Z
    let keysArray = [];
    randomSequence = [];
    randomSequenceLength = 2;

    if (difficulty === 'easy') {
        keysArray.push(numeric);
    } else if (difficulty === 'medium') {
        keysArray.push(letters);
    } else if (difficulty === 'hard') {
        keysArray.push(numeric, letters);
    }

    keysArray.forEach((pack) => {
        for (let code = pack[0]; code <= pack[1]; code += 1) {
            const symbol = String.fromCharCode(code).toUpperCase();
            directSequence.push(symbol);
        }
    });
    getRandomSequence();
}

function getNextLevelSequence() {
    randomSequenceLength += 2;
    randomSequence = [];
    getRandomSequence();
}

function getRandomSequence() {
    for (let index = 0; index < randomSequenceLength; index += 1) {
        const randomNumber = Math.floor(Math.random() * (directSequence.length - 1));
        randomSequence.push(directSequence[randomNumber]);
    }

    console.log(randomSequence);
    displayRandomSequence();
}

function displayRandomSequence() {
    let waitingBeforeStart = setTimeout(() => {
        startDisplaying();
        clearTimeout(waitingBeforeStart);
    }, 500);
}

function startDisplaying() {
    const button = keysCollection.get(randomSequence[indexOfSymbol]);
    button.classList.toggle('keyboard__correct_key');
    let showTime = setTimeout(() => {
        button.classList.toggle('keyboard__correct_key');
        let hideTime = setTimeout(() => {
            indexOfSymbol += 1;
            if (indexOfSymbol === randomSequence.length) {
                indexOfSymbol = 0;
                clearTimeout(hideTime);
                clearTimeout(showTime);
                return;
            }
            startDisplaying();
        }, timeBetweenShows);
    }, timeForShowing);
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
