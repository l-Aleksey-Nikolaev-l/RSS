import { currentLevelId, answerArray } from './variables.js';
import { pictures } from './pictures.js';

function manageCell(targetCell) {
  const isCellFilled = targetCell.classList.contains('fill');
  const targetCellRow = Number(targetCell.dataset.row);
  const targetCellCol = Number(targetCell.dataset.col);
  if (isCellFilled) {
    addAnswer(targetCellCol, targetCellRow);
  } else {
    removeAnswer(targetCellCol, targetCellRow);
  }
  checkWinnings();
}

function addAnswer(targetCellCol, targetCellRow) {
  answerArray.col_answer[targetCellCol][targetCellRow] += 1;
  answerArray.row_answer[targetCellRow][targetCellCol] += 1;
}

function removeAnswer(targetCellCol, targetCellRow) {
  answerArray.col_answer[targetCellCol][targetCellRow] -= 1;
  answerArray.row_answer[targetCellRow][targetCellCol] -= 1;
}

function checkWinnings() {
}

function showPopUp() {
  console.log('Win!');
}

export {
  manageCell
};
