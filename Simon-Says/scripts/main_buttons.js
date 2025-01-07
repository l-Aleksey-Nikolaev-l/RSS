import showSettings from './settings_screen.js';

function clickMainButton(event) {
    const buttonName = event.target.textContent.toLowerCase();
    if (buttonName === 'settings') {
        showSettings();
    }
}

export default clickMainButton;
