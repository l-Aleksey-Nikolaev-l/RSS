import {difficulty} from './variables.js';

function createKeysArray() {
    const numeric = [48, 57]; // from 0 to 9
    const letters = [65, 90]; // from A to Z
    let keysArray = [];

    if (difficulty === 'easy') {
        keysArray.push(numeric);
    } else if (difficulty === 'medium') {
        keysArray.push(letters);
    } else if (difficulty === 'hard') {
        keysArray.push(numeric, letters);
    }

    return keysArray;
}

export {
    createKeysArray
}
