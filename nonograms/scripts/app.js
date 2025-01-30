import { MainScreen } from './ui_components/main_screen.js';
import { startListeners } from './listeners.js';
import { mainScreenParams } from './variables.js';

const body = document.getElementsByClassName('body')[0];
body.classList.add('bg__light');
const mainScreen = new MainScreen(mainScreenParams()).createMainScreen();
body.append(mainScreen);

startListeners();
