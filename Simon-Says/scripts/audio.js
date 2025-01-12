import {backgroundVolume, effectsVolume} from './variables.js';

let audioFile = '';
const audioPlayer = new Audio(audioFile);
audioPlayer.loop = false;
audioPlayer.volume = 0;

function playBackgroundAudio() {
    const randomNumber = Math.ceil(Math.random() * 3);
    audioFile = `./assets/sounds/background/bg_sound_${randomNumber}.mp3`;
    audioPlayer.loop = true;
    audioPlayer.src = audioFile;
    audioPlayer.volume = backgroundVolume;
    return audioPlayer;
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
