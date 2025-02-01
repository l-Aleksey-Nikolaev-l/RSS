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

function playGameOverAudio() {
  const effectPlayer = new Audio();
  effectPlayer.loop = false;
  if (effectPopupState) {
    effectPlayer.src = './assets/sounds/popup.mp3';
    effectPlayer.volume = effectPopupVolume;
    turnOnPlayer(effectPlayer);
  }
}

function turnOnPlayer(effectPlayer) {
  const playPromise = effectPlayer.play();
  if (playPromise !== undefined) {
    playPromise.then().catch(() => {});
  }
}

export {
  playBackgroundAudio,
  playGameOverAudio,
};
