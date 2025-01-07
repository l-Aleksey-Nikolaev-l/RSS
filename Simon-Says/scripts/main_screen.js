import {wrapper} from './variables.js';
class MainScreen {

    #buttons = ['Play', 'Settings', 'Rules'];

    #mainSection() {
        const main = document.createElement('main');
        main.classList.add('main');
        return main;
    }
}

function showMainScreen() {
    return 0;
}

export default showMainScreen;
