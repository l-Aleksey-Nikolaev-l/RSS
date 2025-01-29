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
import { Sidebar } from './ui_components/sidebar.js';

const overlay = document.getElementsByClassName('overlay');
const sidebar = document.getElementsByClassName('sidebar');
const table = document.getElementsByClassName('nonograms__table');

let isOverlayShown = false;
let currentCell = null;
let prevCell = null;

function mouseButtonUp() {
  currentCell = null;
  prevCell = null;
}

function manageHeader(event) {
  const levelId = event.target.dataset.levelId;
  const buttonId = event.target.dataset.id;

  if (levelId) {
    setGameLevel(event, table[0]);
    !isOverlayShown ? setOverlay() : null;
  }

  if (buttonId === 'settings') {
    toggleSidebar(event);
  }
}

function setOverlay() {
  isOverlayShown = true;
  overlay[0].style.display = 'block';
}

function toggleSidebar() {
  const sidebar = document.getElementsByClassName('sidebar');
  if (!sidebar[0]) {
    const gameSection = document.getElementsByClassName('game__section');
    const newSidebar = new Sidebar().createSidebar();
    gameSection[0].append(newSidebar);
    return;
  }
  sidebar[0].classList.toggle('sidebar__active');
}

function setGameLevel(event, table) {
  resetTimer();
  const levelId = event.target.dataset.levelId;
  if (levelId) {
    setLevelGrid(levelId);
    table.deleteCaption();
    while (table.rows.length) {
      table.deleteRow(0);
    }
    const newGrid = new Table(mainScreenParams());
    newGrid.createTableGrid(table);
  }
}

function getPuzzleNameLevel() {
  const regex = /\(.*\)/g;
  const puzzleName = pictures[currentLevelId].name.replace(regex, '').trim();
  const puzzleLevel = pictures[currentLevelId].level.replace(regex, '').trim();
  return `${puzzleName} - ${puzzleLevel}`;
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

export {
  mouseButtonUp,
  toggleSidebar,
  manageHeader,
  setCellStatus,
  setGameLevel,
  getPuzzleNameLevel
};
