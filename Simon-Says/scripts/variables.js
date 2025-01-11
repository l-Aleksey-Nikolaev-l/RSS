const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';
let keysCollection = new Map();

let timeForShowing = 500;
let timeBetweenShowing = 1000;

function addKeyToCollection(key) {
    keysCollection.set(key.dataset.key, key);
}

export {
    body,
    wrapper,
    difficulty,
    keysCollection,
    timeForShowing,
    timeBetweenShowing,
    addKeyToCollection
};

export function setDifficulty(level) {
    difficulty = level;
}
