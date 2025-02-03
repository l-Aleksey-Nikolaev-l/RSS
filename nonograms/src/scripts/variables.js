import { pictures } from './pictures.js';
import { Puzzle } from './puzzle_logic.js';
import { playBackgroundAudio, setBackgroundVolume } from './audio.js';

let musicState = false;
let effectFillState = true;
let effectCrossState = true;
let effectEraseState = true;
let effectPopupState = true;
let musicVolume = 0.2;
let effectFillVolume = 0.2;
let effectCrossVolume = 0.2;
let effectEraseVolume = 0.2;
let effectPopupVolume = 0.2;

let currentLevelId = 0;
let gridSize = 5;
let winnerTime = 0;
let isDarkTheme = false;
let isConfigLoaded = false;

let answerCells = {};

const appConfig = {
  theme: isDarkTheme,
  audio: {
    effectFillState: effectFillState,
    effectCrossState: effectCrossState,
    effectEraseState: effectEraseState,
    effectPopupState: effectPopupState,
    musicVolume: musicVolume,
    effectFillVolume: effectFillVolume,
    effectCrossVolume: effectCrossVolume,
    effectEraseVolume: effectEraseVolume,
    effectPopupVolume: effectPopupVolume
  }
};

let gameConfig = {
  game: {
    lastTime: winnerTime,
    currentLevelId: currentLevelId,
    gridSize: gridSize,
    currentTime: winnerTime,
    answerCells: {}
  }
};

const setAnswerMatrixSize = (size) => {
  answerCells.col_answer = fillAnswerArray(size);
  answerCells.col_cross = fillAnswerArray(size);
  answerCells.row_answer = fillAnswerArray(size);
  answerCells.row_cross = fillAnswerArray(size);
};

const mainScreenParams = () => {
  return {
    lastTime: winnerTime,
    levelId: currentLevelId,
    gridSize: gridSize,
    pictures: pictures
  };
};

function setLevelGrid(levelId) {
  currentLevelId = levelId;
  if (levelId >= 0 && levelId <= 4 ) {
    gridSize = 5;
  } else if (levelId >= 5 && levelId <= 9 ) {
    gridSize = 10;
  } else if (levelId >= 10 && levelId <= 14 ) {
    gridSize = 15;
  }
  setAnswerMatrixSize(gridSize);
}

function fillAnswerArray(size) {
  return new Array(size).fill(null).map(() => Array(size).fill(0));
}

function setAudioState(audio, state) {
  if (audio === 'music__play') {
    musicState = state;
    playBackgroundAudio(musicState);
  }

  if (audio === 'fill__play') {
    effectFillState = state;
  }
  if (audio === 'cross__play') {
    effectCrossState = state;
  }

  if (audio === 'erase__play') {
    effectEraseState = state;
  }

  if (audio === 'popup__play') {
    effectPopupState = state;
  }
}

function setAudioVolume(audio, value) {
  if (audio === 'music__volume') {
    musicVolume = value;
    setBackgroundVolume(value);
  }

  if (audio === 'fill__volume') {
    effectFillVolume = value;
  }
  if (audio === 'cross__volume') {
    effectCrossVolume = value;
  }

  if (audio === 'erase__volume') {
    effectEraseVolume = value;
  }

  if (audio === 'popup__volume') {
    effectPopupVolume = value;
  }
}

function setWinnerTime(time) {
  winnerTime = time;
}

function setThemeState(state) {
  isDarkTheme = state;
}

function getGameConfig(answers) {
  const currentAnswer = structuredClone(gameConfig);
  currentAnswer.game.currentLevelId = currentLevelId;
  currentAnswer.game.gridSize = gridSize;
  currentAnswer.game.currentTime = winnerTime;
  currentAnswer.game.answerCells = answers;
  return currentAnswer;
}

function setGameConfig(savedData) {
  isConfigLoaded = true;
  gameConfig = savedData;
}

function getAppConfig() {
  const currentConfig = structuredClone(appConfig);
  currentConfig.theme = isDarkTheme;
  currentConfig.audio.effectFillState = effectFillState;
  currentConfig.audio.effectCrossState = effectCrossState;
  currentConfig.audio.effectEraseState = effectEraseState;
  currentConfig.audio.effectPopupState = effectPopupState;
  currentConfig.audio.musicVolume = musicVolume;
  currentConfig.audio.effectFillVolume = effectFillVolume;
  currentConfig.audio.effectCrossVolume = effectCrossVolume;
  currentConfig.audio.effectEraseVolume = effectEraseVolume;
  currentConfig.audio.effectPopupVolume = effectPopupVolume;
  return currentConfig;
}

function setAppConfig(config) {
  isDarkTheme = config.theme;
  effectFillState = config.audio.effectFillState;
  effectCrossState = config.audio.effectCrossState;
  effectEraseState = config.audio.effectEraseState;
  effectPopupState = config.audio.effectPopupState;
  musicVolume = config.audio.musicVolume;
  effectFillVolume = config.audio.effectFillVolume;
  effectCrossVolume = config.audio.effectCrossVolume;
  effectEraseVolume = config.audio.effectEraseVolume;
  effectPopupVolume = config.audio.effectPopupVolume;
}

function resumeLastGame() {
  currentLevelId = gameConfig.game.currentLevelId;
  gridSize = gameConfig.game.gridSize;
  winnerTime = gameConfig.game.currentTime;
  answerCells = gameConfig.game.answerCells;
  return structuredClone(gameConfig);
}

export {
  pictures,
  musicState,
  musicVolume,
  effectFillState,
  effectFillVolume,
  effectCrossState,
  effectCrossVolume,
  effectEraseState,
  effectEraseVolume,
  effectPopupState,
  effectPopupVolume,
  currentLevelId,
  gridSize,
  isDarkTheme,
  winnerTime,
  answerCells,
  isConfigLoaded,
  mainScreenParams,
  setAnswerMatrixSize,
  setLevelGrid,
  setAudioState,
  setAudioVolume,
  setWinnerTime,
  setThemeState,
  getGameConfig,
  setGameConfig,
  getAppConfig,
  setAppConfig,
  resumeLastGame
};
