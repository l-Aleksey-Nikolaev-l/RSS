import showMainScreen from './main_screen.js';
import showPlayArea from './play_area_screen.js';
import showSettings from './settings_screen.js';
import showRules from './rules_screen.js';
import startListeners from './listeners.js';
import {startNewGame, repeatGame, startNextRound} from './game_logic.js';

function clickMainButton(event) {
    const buttonName = event.target.textContent.toLowerCase();
    switch (buttonName) {
        case 'start':
        case 'new game':
            showPlayArea();
            startNewGame();
            break;
        case 'repeat':
            showPlayArea();
            repeatGame();
            break;
        case 'next':
            showPlayArea();
            startNextRound();
            break;
        case 'settings':
            showSettings();
            break;
        case 'rules':
            showRules();
            break;
        case 'back':
            showMainScreen();
            break;
    }
    startListeners();
}

export default clickMainButton;
