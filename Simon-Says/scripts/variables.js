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
    setDifficulty,
    clearCollection,
    addKeyToCollection,
    setLevelRound,
    setLevelAttempt
};
