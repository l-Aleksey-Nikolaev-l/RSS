import * as vars from '../variables.js';

function addDataToMatrix(sign, targetCellCol, targetCellRow) {
  if (sign.includes('fill')) {
    vars.answerCells.col_answer[targetCellCol][targetCellRow] += 1;
    vars.answerCells.row_answer[targetCellRow][targetCellCol] += 1;
  } else if (sign.includes('cross')) {
    vars.answerCells.col_cross[targetCellCol][targetCellRow] += 1;
    vars.answerCells.row_cross[targetCellRow][targetCellCol] += 1;
  }
}

function eraseDataFromMatrix(sign, targetCellCol, targetCellRow) {
  if (sign.includes('fill')) {
    vars.answerCells.col_answer[targetCellCol][targetCellRow] -= 1;
    vars.answerCells.row_answer[targetCellRow][targetCellCol] -= 1;
  } else if (sign.includes('cross')) {
    vars.answerCells.col_cross[targetCellCol][targetCellRow] -= 1;
    vars.answerCells.row_cross[targetCellRow][targetCellCol] -= 1;
  }
}

export {
  addDataToMatrix,
  eraseDataFromMatrix
};
