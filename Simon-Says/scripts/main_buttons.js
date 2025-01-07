import showPlayArea from './play_area_screen.js';
import showSettings from './settings_screen.js';
import showRules from './rules_screen.js';

function clickMainButton(event) {
    const buttonName = event.target.textContent.toLowerCase();
    switch (buttonName) {
        case 'play':
            showPlayArea();
            break;
        case 'settings':
            showSettings();
            break;
        case 'rules':
            showRules();
            break;
    }
}

export default clickMainButton;
