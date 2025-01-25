import {
  currentLevelId,
} from './variables.js';
import { pictures } from './pictures.js';

function manageCell(targetCell) {
  const isCellFilled = targetCell.classList.contains('fill');
  if (isCellFilled) {
  } else {
  }
  checkWinnings();
}

function checkWinnings() {
}

function showPopUp() {
  console.log('Win!');
}

export {
  manageCell
};
