import { pictures } from './pictures.js';

let currentLevelId = 0;
let gridSize = 5;

const answerCells = {};

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

const setAnswerMatrixSize = (size) => {
  answerCells.col_answer = fillAnswerArray(size);
  answerCells.row_answer = fillAnswerArray(size);
};

const mainScreenParams = () => {
  return {
    currentLevelId: currentLevelId,
    gridSize: gridSize,
    pictures: pictures,
    setAnswerArraySize: setAnswerMatrixSize
  };
};

function fillAnswerArray(size) {
  return new Array(size).fill(null).map(() => Array(size).fill(0));
}

export {
  currentLevelId,
  gridSize,
  answerCells,
  mainScreenParams,
  setLevelGrid
};
