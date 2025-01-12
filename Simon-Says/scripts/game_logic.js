import {playEffectAudio} from './audio.js';
import {
    buttonsCollection,
    timeForShowing,
    timeBetweenShows,
    levelRound,
    levelAttempt,
    defaultAttempts,
    defaultLevelRound,
    maxLevelRounds,
    isShowAnswer,
    setLevelRound,
    setLevelAttempt
} from './variables.js';

let keyCode = null;
let keyboard = null;
let keyboardKey = null;
let currentDeviceUp = '';

let randomSequence = [];
let roundRandomSequence = [];
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
    unblockButton('Repeat');
    for (const key of keyboard.children) {
        if (keyCode === key.dataset.key && isDevicePressed) {
            key.classList.add('key__pressed');
            break;
        } else if (keyCode === key.dataset.key && !isDevicePressed) {
            checkAnswer(key);
            key.classList.remove('key__pressed');
            break;
        }
    }
}

function unblockButton(buttonName) {
    let  buttonForUnblock = null;
    if (buttonName === 'Repeat') {
        buttonForUnblock = document.getElementsByClassName('repeat__button');
    } else if (buttonName === 'New Game') {
        buttonForUnblock = document.getElementsByClassName('new_game__button');
    }
    buttonForUnblock[0].removeAttribute('disabled');
}

function blockRepeatButton() {
    const repeatButton = document.getElementsByClassName('repeat__button');
    repeatButton[0].setAttribute('disabled','');
}

function replaceButtonName() {
    const repeatButton = document.getElementsByClassName('repeat__button');
    repeatButton[0].classList.remove('main__button_repeat');
    repeatButton[0].classList.add('main__button_next');
    repeatButton[0].textContent = 'Next';
}

function checkAnswer(key) {
    if (randomSequence[0] === keyCode) {
        playEffectAudio(true);
        keyBlink(key, 'keyboard__correct_key');
        randomSequence.shift();
        setGameOver();
    } else {
        playEffectAudio(false);
        keyBlink(key, 'keyboard__incorrect_key');
        setLevelAttempt(levelAttempt - 1);
        setGameOver();
    }
    updateScreenAttempts();
}

function setGameOver() {
    const middleSection = document.getElementsByClassName('middle__play_section');
    if (randomSequence.length && levelAttempt) {
        return;
    } else if (!randomSequence.length) {
        middleSection[0].classList.add('game__won');
        checkLastRound();
    } else if (levelAttempt === 0) {
        middleSection[0].classList.add('game__lose');
        blockRepeatButton();
    }
    keyboard.classList.add('keyboard__block');
}

function checkLastRound() {
    if (levelRound !== maxLevelRounds) {
        replaceButtonName();
    } else {
        blockRepeatButton();
    }
}

function keyBlink(key, answer) {
    key.classList.toggle(answer);
    let showTime = setTimeout(() => {
        key.classList.toggle(answer);
        let hideTime = setTimeout(() => {
            clearTimeout(hideTime);
            clearTimeout(showTime);
        }, timeBetweenShows);
    }, timeForShowing);
}

function createSequence() {
    resetAllVariables();
    resetValues();
    getRandomSequence();
}

function getNextRoundSequence() {
    randomSequenceLength += 2;
    setLevelRound(levelRound + 1);
    resetValues();
    getRandomSequence();
}

function getRandomSequence() {
    for (let index = 0; index < randomSequenceLength; index += 1) {
        const randomNumber = Math.floor(Math.random() * (buttonsCollection.size)).toString();
        randomSequence.push(buttonsCollection.get(randomNumber).dataset.key);
    }

    roundRandomSequence = [...randomSequence];
    showAnswer();
    displayRandomSequence();
}

function showAnswer() {
    if (isShowAnswer) {
        const roundName = ['first', 'second', 'third', 'fourth', 'fifth'];
        const message = `Answer for ${roundName[levelRound - 1]} round is:`;
        console.log(message, randomSequence.join(' '));
    }
}

function displayRandomSequence() {
    let waitingBeforeStart = setTimeout(() => {
        startDisplayingKeys();
        clearTimeout(waitingBeforeStart);
    }, 500);
}

function startDisplayingKeys() {
    if (!randomSequence.length) {
        return;
    }
    const button = buttonsCollection.get(randomSequence[indexOfSymbol]);
    button.classList.toggle('keyboard__correct_key');
    let showTime = setTimeout(() => {
        button.classList.toggle('keyboard__correct_key');
        let hideTime = setTimeout(() => {
            indexOfSymbol += 1;
            if (indexOfSymbol === randomSequence.length) {
                indexOfSymbol = 0;
                clearTimeout(hideTime);
                clearTimeout(showTime);
                startKeysListeners();
                unblockButton('New Game');
                keyboard.classList.remove('keyboard__block');
                return;
            }
            startDisplayingKeys();
        }, timeBetweenShows);
    }, timeForShowing);
}

function resetValues() {
    indexOfSymbol = 0;
    randomSequence = [];
    setLevelAttempt(defaultAttempts);
    updateScreenAttempts();
    updateScreenRound();
}

function resetAllVariables() {
    keyCode = null;
    keyboard = null;
    keyboardKey = null;
    currentDeviceUp = '';
    randomSequence = [];
    roundRandomSequence = [];
    randomSequenceLength = 2;
    indexOfSymbol = 0;

    setLevelRound(defaultLevelRound);
    setLevelAttempt(defaultAttempts);
}

function updateScreenAttempts() {
    const attemptNumber = document.getElementsByClassName('attempt__number');
    attemptNumber[0].textContent = levelAttempt.toString();
}

function updateScreenRound() {
    const roundNumber = document.getElementsByClassName('round__number');
    roundNumber[0].textContent = levelRound.toString() + '/5';
}

function startNewGame() {
    createSequence();
}

function repeatGame() {
    randomSequence = [...roundRandomSequence];
    setLevelAttempt(defaultAttempts);
    updateScreenAttempts();
    displayRandomSequence();
}

function startNextRound() {
    getNextRoundSequence();
}


// add popover  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/togglePopover


export  {
    startNewGame,
    repeatGame,
    startNextRound,
    resetAllVariables
};
