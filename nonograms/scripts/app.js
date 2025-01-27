import { MainScreen } from './main_screen.js';
import { gameListeners } from './listeners.js';
import { mainScreenParams } from './variables.js';

const body = document.getElementsByClassName('body')[0];
const mainScreen = new MainScreen(mainScreenParams()).createMainScreen();
body.append(mainScreen);

gameListeners();
