const body = document.getElementById('top');
const wrapper = document.getElementsByClassName('wrapper');

let difficulty = 'easy';

export {
    body,
    wrapper
};

export function setDifficulty(level) {
    difficulty = level
}
