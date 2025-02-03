import * as vars from '../variables.js';
import * as manageMatrix from './manage_matrix.js';
import * as audio from '../audio.js';
import * as popup from '../helpers/manage_popup.js';
import { Puzzle } from '../puzzle_logic.js';

function collectAnswer() {
  const cells = document.querySelectorAll('.field__cell');
  const answer = {
    fill: [],
    cross: []
  };
  cells.forEach((cell, index) => {
    if (cell.classList.contains('fill')) {
      answer.fill.push(index);
    } else if (cell.classList.contains('cross')) {
      answer.cross.push(index);
    }
  });
  return answer;
}

function setAnswer(sign, targetCellCol, targetCellRow) {
  const colCell = vars.answerCells.col_answer[targetCellCol][targetCellRow];
  const rowCell = vars.answerCells.row_answer[targetCellRow][targetCellCol];
  const colCross = vars.answerCells.col_cross[targetCellCol][targetCellRow];
  const rowCross = vars.answerCells.row_cross[targetCellRow][targetCellCol];
  if (sign.includes('fill')) {
    if (colCross && rowCross) {
      manageMatrix.eraseDataFromMatrix(['cross'], targetCellCol, targetCellRow);
    }
    audio.playCellEffectAudio('fill');
    manageMatrix.addDataToMatrix(['fill'], targetCellCol, targetCellRow);
  } else if (sign.includes('cross')) {
    if (colCell && rowCell) {
      manageMatrix.eraseDataFromMatrix(['fill'], targetCellCol, targetCellRow);
    }
    audio.playCellEffectAudio('cross');
    manageMatrix.addDataToMatrix(['cross'], targetCellCol, targetCellRow);
  } else {
    if (colCell && rowCell) {
      manageMatrix.eraseDataFromMatrix(['fill'], targetCellCol, targetCellRow);
    } else if (colCross && rowCross) {
      manageMatrix.eraseDataFromMatrix(['cross'], targetCellCol, targetCellRow);
    }
    audio.playCellEffectAudio('erase');
  }
  checkWinnings();
}

function checkWinnings() {
  const picToTips = new Puzzle();
  const colsAnswers = picToTips.calculatePicMatrix(vars.answerCells.col_answer)
    .flat().join('');
  const rowsAnswers = picToTips.calculatePicMatrix(vars.answerCells.row_answer)
    .flat().join('');
  const picColsTips = vars.pictures[vars.currentLevelId].col_tips
    .flat().join('');
  const picRowsTips = vars.pictures[vars.currentLevelId].row_tips
    .flat().join('');

  if (colsAnswers === picColsTips && rowsAnswers === picRowsTips) {
    popup.showPopUp();
    audio.playGameOverAudio();
  }
}

export {
  collectAnswer,
  setAnswer
};
