import { mainScreen } from './main_screen.js';
import { tableListeners } from './listeners.js';

const body = document.getElementsByClassName('body')[0];
body.append(mainScreen);

tableListeners();
console.log('Ready!');