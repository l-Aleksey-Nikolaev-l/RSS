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

function calcAnswers(answersData) {
  const mainArray = [];
  let subArray = [];
  let cellsSum = 0;
  answersData.forEach((cellsArr) => {
    subArray = [];
    cellsSum = 0;
    for (let i = 0; i < cellsArr.length; i += 1) {
      if (cellsArr[i] === 0 && cellsSum === 0) {
        continue;
      }
      if (cellsArr[i] === 0 && cellsSum !== 0) {
        subArray.push(cellsSum);
        cellsSum = 0;
        continue;
      }
      cellsSum += 1;
      if (i === cellsArr.length - 1) {
        subArray.push(cellsSum);
        cellsSum = 0;
      }
    }
    mainArray.push(subArray);
  });
  return mainArray.flat().join('');
}

function checkWinnings() {
  const currentPicture = pictures[currentLevelId];
  const colsAnswers = calcAnswers(answerArray.col_answer);
  const rowsAnswers = calcAnswers(answerArray.row_answer);
  const picColsTips = currentPicture.col_tips.flat().join('');
  const picRowsTips = currentPicture.row_tips.flat().join('');
}

function showPopUp() {
  console.log('Win!');
}

export {
  manageCell
};
