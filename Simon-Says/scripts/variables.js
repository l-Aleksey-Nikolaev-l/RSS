const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';
let keysCollection = new Map();

let timeForShowing = 300;
let timeBetweenShows = 300;

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
    addKeyToCollection
};

export function setDifficulty(level) {
    difficulty = level;
}
