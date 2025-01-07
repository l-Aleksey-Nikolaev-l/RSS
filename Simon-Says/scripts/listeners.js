import clickMainButton from './main_buttons.js';

function startListeners() {
    const mainButtons = document.querySelectorAll('.main__button');
    mainButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            clickMainButton(event);
        })
    });
}

export default startListeners;
