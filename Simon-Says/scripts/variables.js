const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';
let buttonsCollection = new Map();

let timeForShowing = 300;
let timeBetweenShows = 300;

const maxLevelRounds = 5;
const defaultLevelRound = 1;
const defaultAttempts = 2;
let levelRound = defaultLevelRound;
let levelAttempt = defaultAttempts;
let isShowAnswer = false;

function setDifficulty(level) {
    difficulty = level;
}

function clearButtonsCollection() {
    buttonsCollection.clear();
}

function addButtonToCollection(button) {
    buttonsCollection.set(button.dataset.key, button);
}

function setLevelRound(round) {
    levelRound = round;
}

function setLevelAttempt(attempt) {
    levelAttempt = attempt;
}

function setShowAnswer(value) {
    isShowAnswer = value;
}

export {
    body,
    wrapper,
    difficulty,
    buttonsCollection,
    timeForShowing,
    timeBetweenShows,
    maxLevelRounds,
    levelRound,
    levelAttempt,
    defaultAttempts,
    defaultLevelRound,
    isShowAnswer,
    setDifficulty,
    clearButtonsCollection,
    addButtonToCollection,
    setLevelRound,
    setLevelAttempt,
    setShowAnswer
};
