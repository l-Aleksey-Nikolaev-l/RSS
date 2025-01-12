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

function playEffectAudio(state) {
    if (state) {
        audioFile = './assets/sounds/success/correct_key.wav';
    } else {
        audioFile = './assets/sounds/fail/fail_key.wav';
    }
    audioPlayer.src = audioFile;
    audioPlayer.volume = effectsVolume;
    audioPlayer.play().then();
}

export {
    playBackgroundAudio,
    playEffectAudio
}
