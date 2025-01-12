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

function playEffectAudio() {
    audioFile = './assets/sounds/background/bg_sound_1.mp3';
    audioPlayer.src = audioFile;
    audioPlayer.volume = effectsVolume;
    return audioPlayer;
}

export {
    playBackgroundAudio,
    playEffectAudio
}
