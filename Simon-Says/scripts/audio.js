import {backgroundVolume} from './variables.js';


const backgroundAudio = './assets/sounds/bg_sound.mp3';
const backgroundPlayer = new Audio(backgroundAudio);
backgroundPlayer.loop = true;
backgroundPlayer.volume = backgroundVolume;



export {
    backgroundPlayer
}
