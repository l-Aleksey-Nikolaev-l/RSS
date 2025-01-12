const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';
let keysCollection = new Map();

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

function clearCollection() {
    keysCollection.clear();
}

function addKeyToCollection(key) {
    keysCollection.set(key.dataset.key, key);
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
    keysCollection,
    timeForShowing,
    timeBetweenShows,
    maxLevelRounds,
    levelRound,
    levelAttempt,
    defaultAttempts,
    defaultLevelRound,
    isShowAnswer,
    setDifficulty,
    clearCollection,
    addKeyToCollection,
    setLevelRound,
    setLevelAttempt,
    setShowAnswer
};
