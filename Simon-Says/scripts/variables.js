const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';
let keysCollection = new Map();

let timeForShowing = 300;
let timeBetweenShows = 300;

const defaultAttempts = 2;
let levelRound = 1;
let levelAttempt = defaultAttempts;

function setDifficulty(level) {
    difficulty = level;
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

export {
    body,
    wrapper,
    difficulty,
    keysCollection,
    timeForShowing,
    timeBetweenShows,
    levelRound,
    levelAttempt,
    defaultAttempts,
    setDifficulty,
    addKeyToCollection,
    setLevelRound,
    setLevelAttempt
};
