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
    const playSetting = document.getElementById('music__play');
    const musicSetting = document.getElementById('audio__setting');
    const effectSetting = document.getElementById('effect__setting');
    const showSetting = document.getElementById('show__setting');
    const hideSetting = document.getElementById('hide__setting');

    mainButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            clearScreen();
            clickMainButton(event);
        })
    });

    difficultySetting?.addEventListener('change', (event) => {
        const level = event.target.value;
        setDifficulty(level);
    });

    playSetting?.addEventListener('change', (event) => {
        const state = event.target.checked;
        setMusicPlay(state);
        playBackgroundAudio(state);
    });

    musicSetting?.addEventListener('input', (event) => {
        const level = event.target.value;
        setMusicVolume(level);
        setBackgroundVolume();
    });

    effectSetting?.addEventListener('input', (event) => {
        const level = event.target.value;
        setEffectsVolume(level);
    });

    showSetting?.addEventListener('input', (event) => {
        const level = event.target.value;
        setTimeToShow(level);
    });

    hideSetting?.addEventListener('input', (event) => {
        const level = event.target.value;
        setTimeBetweenShow(level);
    });
}

export default startListeners;
