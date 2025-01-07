import clickMainButton from './main_buttons.js';
import clearScreen from './clear_screen.js';

function startListeners() {
    const mainButtons = document.querySelectorAll('.main__button');
    mainButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            clearScreen();
            clickMainButton(event);
        })
    });
}

export default startListeners;
