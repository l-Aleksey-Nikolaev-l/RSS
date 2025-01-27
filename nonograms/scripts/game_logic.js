import { currentLevelId, answerArray } from './variables.js';
import { pictures } from './pictures.js';
import { startTimer, stopTimer } from './timer.js';

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
  const currentPicture = pictures[currentLevelId];
  const colsAnswers = calcAnswers(answerArray.col_answer);
  const rowsAnswers = calcAnswers(answerArray.row_answer);
  const picColsTips = currentPicture.col_tips.flat().join('');
  const picRowsTips = currentPicture.row_tips.flat().join('');

  if (picColsTips === colsAnswers && picRowsTips === rowsAnswers) {
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
