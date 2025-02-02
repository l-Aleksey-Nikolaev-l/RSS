import {
  musicState,
  musicVolume,
  effectFillState,
  effectFillVolume,
  effectCrossState,
  effectCrossVolume,
  effectEraseState,
  effectEraseVolume,
  effectPopupState,
  effectPopupVolume
} from './variables.js';

let isAudioBlocked = false;
const musicPlayer = new Audio();
musicPlayer.loop = true;

function setBlockAudio(state) {
  isAudioBlocked = state;
}

function setBackgroundVolume(value) {
  musicPlayer.volume = value;
}

function playBackgroundAudio(state) {
  if (state && musicState) {
    musicPlayer.volume = musicVolume;
    musicPlayer.src = '../assets/sounds/bg_sound.mp3';
    const playPromise = musicPlayer.play();
    if (playPromise !== undefined) {
      playPromise.then().catch(() => {});
    }
  } else {
    musicPlayer.pause();
  }
}

function playCellEffectAudio(cellEvent) {
  const effectPlayer = new Audio();
  effectPlayer.loop = false;
  if (cellEvent === 'fill' && effectFillState) {
    effectPlayer.src = '../assets/sounds/fill.mp3';
    effectPlayer.volume = effectFillVolume;
    turnOnPlayer(effectPlayer);
  } else if (cellEvent === 'cross' && effectCrossState) {
    effectPlayer.src = '../assets/sounds/cross.mp3';
    effectPlayer.volume = effectCrossVolume;
    turnOnPlayer(effectPlayer);
  } else if (cellEvent === 'erase' && effectEraseState) {
    effectPlayer.src = '../assets/sounds/erase.mp3';
    effectPlayer.volume = effectEraseVolume;
    turnOnPlayer(effectPlayer);
  }
}

function playGameOverAudio() {
  const effectPlayer = new Audio();
  effectPlayer.loop = false;
  if (effectPopupState) {
    effectPlayer.src = '../assets/sounds/popup.mp3';
    effectPlayer.volume = effectPopupVolume;
    turnOnPlayer(effectPlayer);
  }
}

function turnOnPlayer(effectPlayer) {
  if (isAudioBlocked) {
    return;
  }
  const playPromise = effectPlayer.play();
  if (playPromise !== undefined) {
    playPromise.then().catch(() => {});
  }
}

export {
  setBackgroundVolume,
  playBackgroundAudio,
  playCellEffectAudio,
  playGameOverAudio,
  setBlockAudio
};
