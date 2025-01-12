import clickMainButton from './main_buttons.js';
import clearScreen from './clear_screen.js';
import {playBackgroundAudio, setBackgroundVolume} from './audio.js';
import {
    setMusicVolume,
    setDifficulty,
    setEffectsVolume,
    setTimeBetweenShow,
    setTimeToShow,
    setMusicPlay
} from './variables.js';

function startListeners() {
    const mainButtons = document.querySelectorAll('.main__button');
    const difficultySetting = document.getElementById('difficulty__list');

    mainButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            clearScreen();
            clickMainButton(event);
        })
    });

    difficultySetting?.addEventListener('change', (event) => {
        const level = event.target.value;
        setDifficulty(level);
    })
}

export default startListeners;
