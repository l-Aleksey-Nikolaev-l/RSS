import {
  musicState,
  musicVolume,
} from './variables.js';
const musicPlayer = new Audio();
musicPlayer.loop = true;

function playBackgroundAudio(state) {
  if (state && musicState) {
    musicPlayer.volume = musicVolume;
    musicPlayer.src = './assets/sounds/bg_sound.mp3';
    const playPromise = musicPlayer.play();
    if (playPromise !== undefined) {
      playPromise.then().catch(() => {});
    }
  } else {
    musicPlayer.pause();
  }
}


export {
  playBackgroundAudio,
};
