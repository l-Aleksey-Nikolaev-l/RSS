import * as vars from '../variables.js';

function getPuzzleNameLevel(isTable) {
  const regex = /\(.*\)/g;
  const puzzleName = vars.pictures[vars.currentLevelId].name
    .replace(regex, '').trim();
  const puzzleLevel = vars.pictures[vars.currentLevelId].level
    .replace(regex, '').trim();
  return isTable ? `${puzzleName} - ${puzzleLevel}` : [puzzleName, puzzleLevel];
}

export {
  getPuzzleNameLevel
};
