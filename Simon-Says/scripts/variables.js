const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';
let keysCollection = new Map();

function addKeyToCollection(key) {
    keysCollection.set(key.dataset.key, key);
}

export {
    body,
    wrapper,
    difficulty,
    keysCollection,
    addKeyToCollection
};

export function setDifficulty(level) {
    difficulty = level;
}
