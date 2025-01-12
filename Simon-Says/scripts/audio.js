import {backgroundVolume, effectsVolume} from './variables.js';

const audioPlayer = new Audio();
audioPlayer.loop = true;

const effectPlayer = new Audio();
effectPlayer.loop = false;

function playBackgroundAudio(state) {
    const randomNumber = Math.ceil(Math.random() * 3);
    audioPlayer.src = `./assets/sounds/background/bg_sound_${randomNumber}.mp3`;
    audioPlayer.volume = backgroundVolume;
    if (state) {
        audioPlayer.play().then();
    } else {
        audioPlayer.pause();
    }
}

function setBackgroundVolume() {
    audioPlayer.volume = backgroundVolume;
}

function playKeyEffectAudio(isCorrectKey) {
    if (isCorrectKey) {
        effectPlayer.src = './assets/sounds/success/correct_key.wav';
    } else {
        effectPlayer.src = './assets/sounds/fail/fail_key.wav';
    }
    effectPlayer.volume = effectsVolume;
    effectPlayer.play().then();
}

function playGameOverAudio(state) {
    if (state === 'round_won') {
        effectPlayer.src = './assets/sounds/success/round_won.wav';
    } else if (state === 'game_won') {
        effectPlayer.src = './assets/sounds/success/game_won.wav';
    }
    else if (state === 'game_lose') {
        effectPlayer.src = './assets/sounds/fail/game_lose.wav';
    }
    effectPlayer.volume = effectsVolume;
    effectPlayer.play().then();
}

export {
    playBackgroundAudio,
    playKeyEffectAudio,
    playGameOverAudio,
    setBackgroundVolume
}
