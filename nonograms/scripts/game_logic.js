import {
  currentLevelId,
  answerCells,
  setLevelGrid,
  mainScreenParams
} from './variables.js';
import { pictures } from './pictures.js';
import { resetTimer, startTimer, stopTimer } from './timer.js';
import { Puzzle } from './puzzle_logic.js';
import { Table } from './ui_components/table.js';

let currentCell = null;
let prevCell = null;

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
  answerCells.col_answer[targetCellCol][targetCellRow] += 1;
  answerCells.row_answer[targetCellRow][targetCellCol] += 1;
  checkWinnings();
}

function removeAnswer(targetCellCol, targetCellRow) {
  const colCell = answerCells.col_answer[targetCellCol][targetCellRow];
  const rowCell = answerCells.row_answer[targetCellRow][targetCellCol];
  if (colCell && rowCell) {
    answerCells.col_answer[targetCellCol][targetCellRow] -= 1;
    answerCells.row_answer[targetCellRow][targetCellCol] -= 1;
    checkWinnings();
  }
}

function checkWinnings() {
  const picToTips = new Puzzle();
  const colsAnswers =
    picToTips.calculatePicMatrix(answerCells.col_answer).flat().join('');
  const rowsAnswers =
    picToTips.calculatePicMatrix(answerCells.row_answer).flat().join('');
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


function setGameLevel(event, table) {
  resetTimer();
  const levelId = event.target.dataset.levelId;
  if (levelId) {
    setLevelGrid(levelId);
    const newGrid = new Table(mainScreenParams());
    while (table.rows.length) {
      table.deleteRow(0);
    }
    newGrid.createTableGrid(table);
  }
}

function setCellStatus(event) {
  const cell = event.target;
  const cellId = cell.dataset.col + cell.dataset.row;
  const mouseButton = event.which;
  const mouseEventType = event.type;
  currentCell = cellId;
  if (!cellId || currentCell === prevCell || !mouseButton) {
    return;
  }

  if (
    mouseButton === 1 ||
    (mouseButton === 1 && mouseEventType === 'mousemove')
  ) {
    prevCell = currentCell;
    cell.classList.toggle('fill');
    cell.classList.remove('cross');
  } else if (
    mouseButton === 3 ||
    (mouseButton === 3 && mouseEventType === 'mousemove')
  ) {
    prevCell = currentCell;
    cell.classList.toggle('cross');
    cell.classList.remove('fill');
  }
  manageCell(cell);
}

export {
  setCellStatus,
  setGameLevel,
};
