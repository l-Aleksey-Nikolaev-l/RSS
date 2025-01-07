import {body} from './variables.js';
import showMainScreen from './main_screen.js'

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

body.insertAdjacentElement('afterbegin', wrapper);

body.onload = () => {
    wrapper.append(showMainScreen());
};