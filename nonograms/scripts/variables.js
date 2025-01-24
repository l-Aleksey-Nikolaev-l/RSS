const difficultySettings = {
  0: 'Easy (5x5)',
  1: 'Medium (10x10)',
  2: 'Hard (15x15)'
};

const picturesNames = {
  0: {
    0: 'Heart (5x5)',
    1: 'Smile (5x5)',
    2: 'Arrow (5x5)',
    3: 'House (5x5)',
    4: 'TV (5x5)'
  },
  1: {
    0: 'TV medium 1',
    1: 'TV medium 2',
    2: 'TV medium 3',
    3: 'TV medium 4',
    4: 'TV medium 5'
  },
  2: {
    0: 'TV hard 1',
    1: 'TV hard 2',
    2: 'TV hard 3',
    3: 'TV hard 4',
    4: 'TV hard 5'
  }
};

let currentLevelId = 0;
const currentCellsMap = new Map();
let gridSize = 5;

function setLevelGrid(levelId) {
  currentLevelId = levelId;
  if (levelId >= 0 && levelId <= 4 ) {
    gridSize = 5;
  } else if (levelId >= 5 && levelId <= 9 ) {
    gridSize = 10;
  } else if (levelId >= 10 && levelId <= 14 ) {
    gridSize = 15;
  }
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
  setLevelGrid,
  addCellToMap,
  removeCellFromMap,
  clearCellsMap
};
