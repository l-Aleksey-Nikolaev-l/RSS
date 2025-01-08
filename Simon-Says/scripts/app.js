import {body} from './variables.js';
import startListeners from './listeners.js';
import showMainScreen from './main_screen.js'

function createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    body.insertAdjacentElement('afterbegin', wrapper);
}

body.onload = () => {
    createWrapper();
    startListeners();
};