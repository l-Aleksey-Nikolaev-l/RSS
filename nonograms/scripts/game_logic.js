import {
  currentLevelId,
  gridSize,
  answerCells,
  setLevelGrid,
  mainScreenParams,
  setThemeState,
  setAudioState,
  setAudioVolume
} from './variables.js';
import { pictures } from './pictures.js';
import { resetTimer, startTimer, stopTimer } from './timer.js';
import { Puzzle } from './puzzle_logic.js';
import { Table } from './ui_components/table.js';
import { Sidebar } from './ui_components/sidebar.js';
import { Popup } from './ui_components/popup.js';
import { startSidebarListeners } from './listeners.js';

const body = document.getElementsByClassName('body');
const overlay = document.getElementsByClassName('overlay');
const sidebar = document.getElementsByClassName('sidebar');
const gameSection = document.getElementsByClassName('game__section');
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
    setGameByLevel(levelId, table[0]);
    !isOverlayShown ? setOverlay() : null;
  }

  if (buttonId === 'repeat') {
    setGameByLevel(currentLevelId, table[0]);
  }

  if (buttonId === 'random') {
    const numberOfLevels = Object.keys(pictures).length;
    const randomLevelId = Math.floor(Math.random() * numberOfLevels);
    setGameByLevel(randomLevelId, table[0]);
  }

  if (buttonId === 'settings') {
    toggleSidebar(event);
    isOverlayShown ? removeOverlay() : setOverlay();
  }
}

function setOverlay() {
  isOverlayShown = true;
  overlay[0].style.display = 'block';
  overlay[0].addEventListener('click', removeOverlay);
  table[0].addEventListener('mousemove', removeOverlay);
}

function removeOverlay() {
  isOverlayShown = false;
  sidebar[0]?.classList.remove('sidebar__active');
  overlay[0].style.removeProperty('display');
  overlay[0].removeEventListener('click', removeOverlay);
  table[0].removeEventListener('mousemove', removeOverlay);
}

function toggleSidebar() {
  const sidebar = document.getElementsByClassName('sidebar');
  if (!sidebar[0]) {
    const gameSection = document.getElementsByClassName('game__section');
    const newSidebar = new Sidebar().createSidebar();
    gameSection[0].append(newSidebar);
    startSidebarListeners();
    return;
  }
  sidebar[0].classList.toggle('sidebar__active');
}

function setGameByLevel(levelId, table) {
  resetTimer();
  removePopup();
  setLevelGrid(levelId);
  table.deleteCaption();
  while (table.rows.length) {
    table.deleteRow(0);
  }
  const newGrid = new Table(mainScreenParams());
  newGrid.createTableGrid(table);
}

function getPuzzleNameLevel() {
  const regex = /\(.*\)/g;
  const puzzleName = pictures[currentLevelId].name.replace(regex, '').trim();
  const puzzleLevel = pictures[currentLevelId].level.replace(regex, '').trim();
  return `${puzzleName} - ${puzzleLevel}`;
}

function solvePuzzle(event) {
  const eventId = event.target.dataset.id;
  if (eventId === 'solve') {
    const currentPicture = pictures[currentLevelId];
    const picArray = new Puzzle(currentPicture).getPicByTips().flat();
    fillTable(picArray);
  }
}

function fillTable(picArray) {
  const cellsArray = document.querySelectorAll('.field__cell');
  picArray.forEach((value, index) => {
    setTimeout(() => {
      if (value !== 0) {
        cellsArray[index].classList.remove('cross');
        cellsArray[index].classList.add('fill');
      } else {
        cellsArray[index].classList.remove('fill');
        cellsArray[index].classList.add('cross');
      }
    }, (25 / gridSize) * index);
  });
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
  const popup = new Popup().createPopUp();
  gameSection[0].prepend(popup);
}

function removePopup() {
  setBlock(false);
  const popup = document.getElementsByClassName('popup__window');
  popup[0]?.remove();
}

function sidebarSettings(event) {
  const inputType = event.target.type;
  const inputId = event.target.id;
  if (inputType === 'checkbox' && inputId === 'themes__switch') {
    const state = event.target.checked;
    setThemeState(state);
    setTheme();
  } else if (inputType === 'checkbox') {
    const state = event.target.checked;
    setAudioState(inputId, state);
  } else if (inputType === 'range') {
    const value = event.target.value;
    setAudioVolume(inputId, value);
  }
}

function setTheme() {
  body[0].classList.toggle('bg__dark');
  body[0].classList.toggle('bg__light');

}

export {
  mouseButtonUp,
  toggleSidebar,
  manageHeader,
  solvePuzzle,
  setCellStatus,
  getPuzzleNameLevel,
  sidebarSettings,
  removePopup
};
