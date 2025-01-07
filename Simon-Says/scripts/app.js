import {body} from "./variables";

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

body.insertAdjacentElement('afterbegin', wrapper);