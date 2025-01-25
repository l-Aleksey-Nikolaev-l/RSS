const difficultySettings = {
  0: 'Easy (5x5)',
  1: 'Medium (10x10)',
  2: 'Hard (15x15)'
};

const picturesNames = {
  0: {
    0: 'A heart (5x5)',
    1: 'A smile (5x5)',
    2: 'An arrow (5x5)',
    3: 'A house (5x5)',
    4: 'A TV (5x5)'
  },
  1: {
    0: 'A sandwatch (10x10)',
    1: 'A musical note (10x10)',
    2: 'A battery (10x10)',
    3: 'A camera (10x10)',
    4: 'A tree (10x10)'
  },
  2: {
    0: 'A bottle (15x15)',
    1: 'A bus (15x15)',
    2: 'A mushroom (15x15)',
    3: 'A ship (15x15)',
    4: 'A fish (15x15)'
  }
};

let currentLevelId = 0;
const currentCellsMap = new Map();
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

function fillAnswerArray(size) {
  return new Array(size).fill(null).map(() => Array(size).fill(0));
}

function addCellToMap(key, value) {
  currentCellsMap.set(key, value);
}

function removeCellFromMap(key) {
  currentCellsMap.delete(key);
}

function clearCellsMap() {
  currentCellsMap.clear();
}

export {
  difficultySettings,
  currentCellsMap,
  picturesNames,
  currentLevelId,
  gridSize,
  answerArray,
  setAnswerArraySize,
  setLevelGrid,
  addCellToMap,
  removeCellFromMap,
  clearCellsMap
};
