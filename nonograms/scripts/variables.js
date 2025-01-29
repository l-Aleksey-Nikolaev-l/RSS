import { pictures } from './pictures.js';

let musicState = false;
let effectFillState = true;
let effectCrossState = true;
let effectEraseState = true;
let musicVolume = 0.2;
let effectFillVolume = 0.2;
let effectCrossVolume = 0.2;
let effectEraseVolume = 0.2;

let currentLevelId = 0;
let gridSize = 5;

let isDarkTheme = false;

const answerCells = {};

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
  if (audio === 'music') {
    musicState = state;
  }

  if (audio === 'fill') {
    effectFillState = state;
  }
  if (audio === 'cross') {
    effectCrossState = state;
  }

  if (audio === 'erase') {
    effectEraseState = state;
  }
}

function setAudioVolume(audio, value) {
  if (audio === 'music') {
    musicVolume = value;
  }

  if (audio === 'fill') {
    effectFillVolume = value;
  }
  if (audio === 'cross') {
    effectCrossVolume = value;
  }

  if (audio === 'erase') {
    effectEraseVolume = value;
  }
}

function setTheme(state) {
  isDarkTheme = state;
}

export {
  musicState,
  musicVolume,
  effectFillState,
  effectFillVolume,
  effectCrossState,
  effectCrossVolume,
  effectEraseState,
  effectEraseVolume,
  currentLevelId,
  gridSize,
  isDarkTheme,
  answerCells,
  mainScreenParams,
  setAnswerMatrixSize,
  setLevelGrid,
  setAudioState,
  setAudioVolume,
  setTheme
};
