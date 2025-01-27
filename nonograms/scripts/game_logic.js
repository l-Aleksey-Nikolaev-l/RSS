import { currentLevelId, answerArray } from './variables.js';
import { pictures } from './pictures.js';
import { startTimer, stopTimer } from './timer.js';
import { Puzzle } from './puzzle_logic.js';

function manageCell(targetCell) {
  startTimer();
  const isCellFilled = targetCell.classList.contains('fill');
  const targetCellRow = Number(targetCell.dataset.row);
  const targetCellCol = Number(targetCell.dataset.col);
  if (isCellFilled) {
    addAnswer(targetCellCol, targetCellRow);
  } else {
    removeAnswer(targetCellCol, targetCellRow);
  }
}

function addAnswer(targetCellCol, targetCellRow) {
  answerArray.col_answer[targetCellCol][targetCellRow] += 1;
  answerArray.row_answer[targetCellRow][targetCellCol] += 1;
  checkWinnings();
}

function removeAnswer(targetCellCol, targetCellRow) {
  const colCell = answerArray.col_answer[targetCellCol][targetCellRow];
  const rowCell = answerArray.row_answer[targetCellRow][targetCellCol];
  if (colCell && rowCell) {
    answerArray.col_answer[targetCellCol][targetCellRow] -= 1;
    answerArray.row_answer[targetCellRow][targetCellCol] -= 1;
    checkWinnings();
  }
}

function checkWinnings() {
  const picToTips = new Puzzle();
  const colsAnswers =
    picToTips.calculatePicMatrix(answerArray.col_answer).flat().join('');
  const rowsAnswers =
    picToTips.calculatePicMatrix(answerArray.row_answer).flat().join('');
  const picColsTips = pictures[currentLevelId].col_tips.flat().join('');
  const picRowsTips = pictures[currentLevelId].row_tips.flat().join('');

  if (colsAnswers === picColsTips && rowsAnswers === picRowsTips) {
    showPopUp();
  }
}

function showPopUp() {
  stopTimer();
  console.log('Win!');
}

export {
  manageCell
};
