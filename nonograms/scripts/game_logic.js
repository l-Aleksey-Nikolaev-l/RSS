import {
  pictures,
  currentLevelId,
  gridSize,
  answerCells,
  setLevelGrid,
  mainScreenParams,
  setThemeState,
  setAudioState,
  setAudioVolume,
  setAppConfig,
  resumeLastGame
} from './variables.js';
import { resetTimer, startTimer, stopTimer } from './timer.js';
import { Puzzle } from './puzzle_logic.js';
import { Table } from './ui_components/table.js';
import { Sidebar } from './ui_components/sidebar.js';
import { Popup } from './ui_components/popup.js';
import { startSidebarListeners, setOverlayListeners } from './listeners.js';
import { saveCurrentGame } from './save_load_config.js';

let isOverlayShown = false;
let currentCell = null;
let prevCell = null;
let prevLevel = null;
let prevPicture = null;
let menuLevel = null;

function tapOnMenu(event) {
  const isMenu = event.target.classList.contains('level__menu_item');
  const isMenuLevel = event.target.classList.contains('level__item');
  const isLevelImage = event.target.classList.contains('level__image');

  if (isMenu || isMenuLevel || isLevelImage) {
    event.preventDefault();
  }

  if (isMenu) {
    menuLevel = event.target;
    event.target.classList.toggle('menu__tap');
    isOverlayShown ? removeOverlay(event) : setOverlay(event);
    return;
  }

  if (isMenuLevel && event.target !== prevLevel) {
    event.target.classList.add('menu__level_hover');
    prevLevel?.classList.remove('menu__level_hover');
    prevPicture?.classList.remove('menu__image_hover');
    prevLevel = event.target;
    prevPicture = null;
    return;
  }

  if (isLevelImage && event.target !== prevPicture) {
    event.target.classList.add('menu__image_hover');
    prevPicture?.classList.remove('menu__image_hover');
    prevPicture = event.target;
    manageHeader(event);
  }
}

function mouseButtonUp() {
  currentCell = null;
  prevCell = null;
}

function manageHeader(event) {
  const table = document.getElementsByClassName('nonograms__table');
  const levelId = event.target.dataset.levelId;
  const buttonId = event.target.dataset.id;

  if (levelId) {
    setGameByLevel(levelId, table[0]);
    setSaveResumeButton('save');
  }

  if (buttonId === 'save') {
    saveCurrentGame();
    setSaveResumeButton('resume');
  }

  if (buttonId === 'resume') {
    setSaveResumeButton('save');
    const lastSave = resumeLastGame().game.answerCells;
    const colTips = lastSave.col_tips;
    const rowTips = lastSave.row_tips;
    const colCross = lastSave.col_cross;
    const rowCross = lastSave.row_cross;
    setGameByLevel(currentLevelId, table[0]);
    const picArray = new Puzzle(colTips, rowTips).getPicByTips();
    const crossArray = new Puzzle(colCross, rowCross).getPicByTips();
    restoreData(['fill'], picArray);
    restoreData(['cross'], crossArray);
  }

  if (buttonId === 'repeat') {
    setGameByLevel(currentLevelId, table[0]);
    setSaveResumeButton('save');
  }

  if (buttonId === 'random') {
    const numberOfLevels = Object.keys(pictures).length;
    const randomLevelId = Math.floor(Math.random() * numberOfLevels);
    setGameByLevel(randomLevelId, table[0]);
    setSaveResumeButton('save');
  }

  if (buttonId === 'settings') {
    toggleSidebar(event);
    isOverlayShown ? removeOverlay(event) : setOverlay(event);
  }
}

function restoreData(sign, dataArray) {
  dataArray.forEach((row, row_index) => {
    row.forEach((cell, col_index) => {
      if (cell === 1) {
        setAnswer(sign, col_index, row_index);
      }
    });
  });
}

function setSaveResumeButton(name) {
  const saveResumeButton = document.querySelectorAll('[data-id]');
  saveResumeButton[0].dataset.id = name;
  saveResumeButton[0].textContent = name;
}

function setOverlay(event) {
  isOverlayShown = true;
  setOverlayListeners(event, true);
}

function removeOverlay(event) {
  isOverlayShown = false;
  setOverlayListeners(event, false);
  resetMenus();
}

function resetMenus() {
  const sidebar = document.getElementsByClassName('sidebar');
  sidebar[0]?.classList.remove('sidebar__active');
  menuLevel?.classList.remove('menu__tap');
  prevLevel?.classList.remove('menu__level_hover');
  prevPicture?.classList.remove('menu__image_hover');
  prevLevel = null;
  prevPicture = null;
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
    stopTimer();
    setBlock(true);
    const currentPicture = pictures[currentLevelId];
    const picArray = new Puzzle(currentPicture).getPicByTips().flat();
    fillTable(picArray);
  }
}

function fillTable(sign, picArray) {
  const cellsArray = document.querySelectorAll('.field__cell');
  picArray.forEach((value, index) => {
    setTimeout(() => {
      if (sign.includes('all')) {
        if (value !== 0) {
          cellsArray[index].classList.remove('cross');
          cellsArray[index].classList.add('fill');
        } else {
          cellsArray[index].classList.remove('fill');
          cellsArray[index].classList.add('cross');
        }
      }
      if (value !== 0 && sign.includes('fill')) {
        cellsArray[index].classList.add('fill');
      } else if (value !== 0 && sign.includes('cross')) {
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

  setSaveResumeButton('save');

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
  const sign =[...targetCell.classList];
  const targetCellRow = Number(targetCell.dataset.row);
  const targetCellCol = Number(targetCell.dataset.col);
  setAnswer(sign, targetCellCol, targetCellRow);
}

function setAnswer(sign, targetCellCol, targetCellRow) {
  const colCell = answerCells.col_answer[targetCellCol][targetCellRow];
  const rowCell = answerCells.row_answer[targetCellRow][targetCellCol];
  const colCross = answerCells.col_cross[targetCellCol][targetCellRow];
  const rowCross = answerCells.row_cross[targetCellRow][targetCellCol];
  if (sign.includes('fill')) {
    if (colCross && rowCross) {
      eraseDataFromMatrix(['cross'], targetCellCol, targetCellRow);
    }
    addDataToMatrix(['fill'], targetCellCol, targetCellRow);
  } else if (sign.includes('cross')) {
    if (colCell && rowCell) {
      eraseDataFromMatrix(['fill'], targetCellCol, targetCellRow);
    }
    addDataToMatrix(['cross'], targetCellCol, targetCellRow);
  } else {
    if (colCell && rowCell) {
      eraseDataFromMatrix(['fill'], targetCellCol, targetCellRow);
    } else if (colCross && rowCross) {
      eraseDataFromMatrix(['cross'], targetCellCol, targetCellRow);
    }
  }
  checkWinnings();
}

function addDataToMatrix(sign, targetCellCol, targetCellRow) {
  if (sign.includes('fill')) {
    answerCells.col_answer[targetCellCol][targetCellRow] += 1;
    answerCells.row_answer[targetCellRow][targetCellCol] += 1;
  } else if (sign.includes('cross')) {
    answerCells.col_cross[targetCellCol][targetCellRow] += 1;
    answerCells.row_cross[targetCellRow][targetCellCol] += 1;
  }
}

function eraseDataFromMatrix(sign, targetCellCol, targetCellRow) {
  if (sign.includes('fill')) {
    answerCells.col_answer[targetCellCol][targetCellRow] -= 1;
    answerCells.row_answer[targetCellRow][targetCellCol] -= 1;
  } else if (sign.includes('cross')) {
    answerCells.col_cross[targetCellCol][targetCellRow] -= 1;
    answerCells.row_cross[targetCellRow][targetCellCol] -= 1;
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
  setBlock(true);
  const gameSection = document.getElementsByClassName('game__section');
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
    setTheme(state);
  } else if (inputType === 'checkbox') {
    const state = event.target.checked;
    setAudioState(inputId, state);
  } else if (inputType === 'range') {
    const value = event.target.value;
    setAudioVolume(inputId, value);
  }
}

function setTheme(state) {
  const body = document.getElementsByClassName('body');
  if (state) {
    body[0].classList.add('bg__dark');
    body[0].classList.remove('bg__light');
  } else {
    body[0].classList.add('bg__light');
    body[0].classList.remove('bg__dark');
  }
}

function setBlock(state) {
  const table = document.getElementsByClassName('nonograms__table');
  const saveResumeButton = document.querySelectorAll('[data-id]');
  if(state) {
    table[0].classList.add('block__element');
    saveResumeButton[0].classList.add('block__element');
  } else {
    table[0].classList.remove('block__element');
    saveResumeButton[0].classList.remove('block__element');
  }
}

export {
  tapOnMenu,
  mouseButtonUp,
  removeOverlay,
  toggleSidebar,
  manageHeader,
  solvePuzzle,
  setCellStatus,
  getPuzzleNameLevel,
  sidebarSettings,
  removePopup,
  loadSavedData
};
