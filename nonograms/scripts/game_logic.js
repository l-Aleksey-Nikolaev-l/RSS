import { currentLevelId } from './variables.js';
import { pictures } from './pictures.js';

function manageCell(targetCell) {
  const cellsOfPic = pictures[currentLevelId].cells;
  const isCellFilled = targetCell.classList.contains('fill');
  const targetCellId = Number(targetCell.dataset.id);
  const isIdFound = cellsOfPic.includes(targetCellId);
}

export {
  manageCell
};
