const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';
let keysCollection = new Map();

let timeForShowing = 300;
let timeBetweenShows = 300;

function setDifficulty(level) {
    difficulty = level;
}

function addKeyToCollection(key) {
    keysCollection.set(key.dataset.key, key);
}

export {
    body,
    wrapper,
    difficulty,
    keysCollection,
    timeForShowing,
    timeBetweenShows,
    setDifficulty,
    addKeyToCollection,
};
