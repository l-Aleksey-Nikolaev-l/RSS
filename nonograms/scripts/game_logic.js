import {
  currentLevelId,
  currentCellsMap,
  addCellToMap,
  removeCellFromMap
} from './variables.js';
import { pictures } from './pictures.js';

function manageCell(targetCell) {
  const cellsOfPic = pictures[currentLevelId].cells;
  const isCellFilled = targetCell.classList.contains('fill');
  const targetCellId = Number(targetCell.dataset.id);
  const isIdFound = cellsOfPic.includes(targetCellId);

  if (isCellFilled) {
    addCellToMap(targetCellId, isIdFound);
  } else {
    removeCellFromMap(targetCellId);
  }
  checkWinnings(cellsOfPic);
}

function checkWinnings(cellsOfPic) {
  try {
    if (currentCellsMap.size === cellsOfPic.length) {
      currentCellsMap.forEach((value) => {
        if (!value) {
          throw '';
        }
      });
      console.log('Win!');
    }
  } catch {
  }
}

export {
  manageCell
};
