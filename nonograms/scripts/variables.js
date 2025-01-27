import { pictures } from './pictures.js';

let currentLevelId = 0;
let gridSize = 5;
const answerArray = {
  col_answer: [],
  row_answer: []
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
  setAnswerArraySize(gridSize);
}

function setAnswerArraySize(size) {
  answerArray.col_answer = fillAnswerArray(size);
  answerArray.row_answer = fillAnswerArray(size);
}

const mainScreenParams = () => {
  return {
    currentLevelId: currentLevelId,
    gridSize: gridSize,
    pictures: pictures,
    setAnswerArraySize: setAnswerArraySize
  };
};

function fillAnswerArray(size) {
  return new Array(size).fill(null).map(() => Array(size).fill(0));
}

export {
  currentLevelId,
  gridSize,
  answerArray,
  mainScreenParams,
  setAnswerArraySize,
  setLevelGrid
};
