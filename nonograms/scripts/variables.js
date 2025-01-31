import { pictures } from './pictures.js';
import { Puzzle } from './puzzle_logic.js';

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

let appConfig = {
  theme: isDarkTheme,
  audio: {
    musicState: musicState,
    effectFillState: effectFillState,
    effectCrossState: effectCrossState,
    effectEraseState: effectEraseState,
    effectPopupState: effectPopupState,
    musicVolume: musicVolume,
    effectFillVolume: effectFillVolume,
    effectCrossVolume: effectCrossVolume,
    effectEraseVolume: effectEraseVolume,
    effectPopupVolume: effectPopupVolume
  },
  game: {
    currentLevelId: currentLevelId,
    gridSize: gridSize,
    currentTime: winnerTime,
    answerCells: {}
  }
};

const setAnswerMatrixSize = (size) => {
  answerCells.col_answer = fillAnswerArray(size);
  answerCells.row_answer = fillAnswerArray(size);
};

const mainScreenParams = () => {
  return {
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

function createAppConfig() {
  const currentAnswer = structuredClone(appConfig);
  currentAnswer.theme = isDarkTheme;
  currentAnswer.audio.musicState = musicState;
  currentAnswer.audio.effectFillState = effectFillState;
  currentAnswer.audio.effectCrossState = effectCrossState;
  currentAnswer.audio.effectEraseState = effectEraseState;
  currentAnswer.audio.effectPopupState = effectPopupState;
  currentAnswer.audio.musicVolume = musicVolume;
  currentAnswer.audio.effectFillVolume = effectFillVolume;
  currentAnswer.audio.effectCrossVolume = effectCrossVolume;
  currentAnswer.audio.effectEraseVolume = effectEraseVolume;
  currentAnswer.audio.effectPopupVolume = effectPopupVolume;
  currentAnswer.game.currentLevelId = currentLevelId;
  currentAnswer.game.gridSize = gridSize;
  currentAnswer.game.currentTime = winnerTime;

  const picToTips = new Puzzle();
  const colsAnswers =
    picToTips.calculatePicMatrix(answerCells.col_answer);
  const rowsAnswers =
    picToTips.calculatePicMatrix(answerCells.row_answer);

  currentAnswer.game.answerCells.col_tips = colsAnswers;
  currentAnswer.game.answerCells.row_tips = rowsAnswers;

  return currentAnswer;
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
  appConfig,
  mainScreenParams,
  setAnswerMatrixSize,
  setLevelGrid,
  setAudioState,
  setAudioVolume,
  setWinnerTime,
  setThemeState
};
