import {backgroundVolume, effectsVolume} from './variables.js';

const audioPlayer = new Audio();
audioPlayer.loop = true;

function playBackgroundAudio() {
    const randomNumber = Math.ceil(Math.random() * 3);
    audioPlayer.src = `./assets/sounds/background/bg_sound_${randomNumber}.mp3`;
    audioPlayer.volume = backgroundVolume;
    if (state) {
        audioPlayer.play().then();
    } else {
        audioPlayer.pause();
    }
}

function playKeyEffectAudio(isCorrectKey) {
    if (isCorrectKey) {
        audioFile = './assets/sounds/success/correct_key.wav';
    } else {
        audioFile = './assets/sounds/fail/fail_key.wav';
    }
    audioPlayer.src = audioFile;
    audioPlayer.volume = effectsVolume;
    audioPlayer.play().then();
}

function playGameOverAudio(state) {
    if (state === 'round_won') {
        audioFile = './assets/sounds/success/round_won.wav';
    } else if (state === 'game_won') {
        audioFile = './assets/sounds/success/game_won.wav';
    }
    else if (state === 'game_lose') {
        audioFile = './assets/sounds/fail/game_lose.wav';
    }
    audioPlayer.src = audioFile;
    audioPlayer.volume = effectsVolume;
    audioPlayer.play().then();
}

export {
    playBackgroundAudio,
    playKeyEffectAudio,
    playGameOverAudio
}
