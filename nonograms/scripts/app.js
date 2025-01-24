import { MainScreen } from './main_screen.js';
import { gameListeners } from './listeners.js';

const body = document.getElementsByClassName('body')[0];
const mainScreen = new MainScreen().createMainScreen();
body.append(mainScreen);

console.log('Ready!');
gameListeners();