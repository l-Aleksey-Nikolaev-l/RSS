import * as vars from './variables.js';
import * as timer from './timer.js';
import * as listeners from './listeners.js';
import * as slConfig from './save_load_config.js';
import * as audio from './audio.js';
import { Puzzle } from './puzzle_logic.js';
import { Table } from './ui_components/table.js';
import { Sidebar } from './ui_components/sidebar.js';
import { Popup } from './ui_components/popup.js';

let isOverlayShown = false;
let currentCell = null;
let prevCell = null;

function mouseButtonUp() {
  currentCell = null;
  prevCell = null;
}

function manageHeader(event) {
  const table = document.getElementsByClassName('nonograms__table');
  const levelId = event.target.dataset.levelId;
  const buttonId = event.target.dataset.id;

  if (levelId) {
    setGameByLevel(event, levelId, table[0]);
    setSaveResumeButton('save');
  }

  if (buttonId === 'save') {
    slConfig.saveCurrentGame();
    setSaveResumeButton('resume');
  }

  if (buttonId === 'resume') {
    resumeGame(event, table);
  }

  if (buttonId === 'repeat') {
    setGameByLevel(event, vars.currentLevelId, table[0]);
    setSaveResumeButton('save');
  }

  if (buttonId === 'random') {
    const numberOfLevels = Object.keys(vars.pictures).length;
    const randomLevelId = Math.floor(Math.random() * numberOfLevels);
    setGameByLevel(event, randomLevelId, table[0]);
    setSaveResumeButton('save');
  }

  if (buttonId === 'settings') {
    toggleSidebar(event);
    isOverlayShown ? removeOverlay(event) : setOverlay(event);
  }
}

function setSaveResumeButton(name) {
  const saveResumeButton = document.querySelectorAll('[data-id]');
  saveResumeButton[0].dataset.id = name;
  saveResumeButton[0].textContent = name;
  if (name === 'save') {
    saveResumeButton[0].classList.remove('resume_button');
    saveResumeButton[0].classList.add('save_button');
  } else if (name === 'resume') {
    saveResumeButton[0].classList.remove('save_button');
    saveResumeButton[0].classList.add('resume_button');
  }
}

function setOverlay(event) {
  isOverlayShown = true;
  listeners.setOverlayListeners(event, true);
}

function removeOverlay(event) {
  isOverlayShown = false;
  listeners.setOverlayListeners(event, false);
  resetMenus();
}

function toggleSidebar() {
  const sidebar = document.getElementsByClassName('sidebar');
  if (!sidebar[0]) {
    const gameSection = document.getElementsByClassName('game__section');
    const newSidebar = new Sidebar().createSidebar();
    gameSection[0].append(newSidebar);
    listeners.startSidebarListeners();
  } else {
    const themeSwitch = document.getElementById('themes__switch');
    themeSwitch.checked = vars.isDarkTheme;
    sidebar[0].classList.toggle('sidebar__active');
  }
  const isSidebarShown = sidebar[0].classList.contains('sidebar__active');
  isSidebarShown && refreshBestTimeTable();
}

function setGameByLevel(event, levelId, table) {
  const eventId = event.target.dataset.id;
  const isResetTime = eventId !== 'save';
  timer.resetTimer(isResetTime);
  removePopup();
  setBlock(false);
  vars.setLevelGrid(levelId);
  table.deleteCaption();
  while (table.rows.length) {
    table.deleteRow(0);
  }
  const newGrid = new Table(vars.mainScreenParams());
  newGrid.createTableGrid(table);
}

function getPuzzleNameLevel(isTable) {
  const regex = /\(.*\)/g;
  const puzzleName = vars.pictures[vars.currentLevelId].name
    .replace(regex, '').trim();
  const puzzleLevel = vars.pictures[vars.currentLevelId].level
    .replace(regex, '').trim();
  return isTable ? `${puzzleName} - ${puzzleLevel}` : [puzzleName, puzzleLevel];
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
  audio.setBlockAudio(false);
  manageCell(cell);
}

function manageCell(targetCell) {
  timer.startTimer();
  const sign =[...targetCell.classList];
  const targetCellRow = Number(targetCell.dataset.row);
  const targetCellCol = Number(targetCell.dataset.col);
  setAnswer(sign, targetCellCol, targetCellRow);
}

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

function showPopUp() {
  timer.stopTimer(true);
  setBlock(true);
  const gameSection = document.getElementsByClassName('game__section');
  const popup = new Popup().createPopUp();
  gameSection[0].prepend(popup);
  listeners.startPopupListener();
}

function removePopup() {
  const popup = document.getElementsByClassName('popup__window');
  popup[0]?.remove();
}

function sidebarSettings(event) {
  const inputType = event.target.type;
  const inputId = event.target.id;
  if (inputType === 'checkbox' && inputId === 'themes__switch') {
    const state = event.target.checked;
    vars.setThemeState(state);
    setTheme(state);
  } else if (inputType === 'checkbox') {
    const state = event.target.checked;
    vars.setAudioState(inputId, state);
  } else if (inputType === 'range') {
    const value = event.target.value;
    vars.setAudioVolume(inputId, value);
  }
  setTimeout(() => {
    slConfig.saveAppSettings();
  }, 1000);
}

function refreshBestTimeTable() {
  const leaderTable = document.getElementsByClassName('time__table');
  const leadersData = slConfig.getLeaders();
  if (!leadersData) {
    return;
  }
  while (leaderTable[0].rows.length !== 1) {
    leaderTable[0].deleteRow(1);
  }
  const savedData = JSON.parse(leadersData);
  savedData.forEach((leader) => {
    const leaderItem = new Sidebar().createBestTimeItem(leader);
    leaderTable[0].append(leaderItem);
  });
}

function saveBestTime(winnersTime) {
  const leadersData = slConfig.getLeaders();
  let savedData = JSON.parse(leadersData);
  const puzzleNameLevel = getPuzzleNameLevel();
  const formatedTime = timer.convertSecondsToTime(winnersTime);
  const currentData = [1, puzzleNameLevel[0], puzzleNameLevel[1], formatedTime];
  if (!savedData) {
    savedData = [currentData];
  } else {
    for (let index = 0; index < 5; index += 1) {
      if (!savedData[index]) {
        savedData.push(currentData);
        break;
      }
      const savedTime = Number(savedData[index][3].replace(':', ''));
      const currentTime = Number(currentData[3].replace(':', ''));
      savedData[index][0] = index + 1;

      if (currentTime < savedTime) {
        savedData.splice(index, 0, currentData);
        break;
      }
    }
    savedData.forEach((_, index) => {
      savedData[index][0] = index + 1;
    });
  }
  const stringData = JSON.stringify(savedData.slice(0, 5));
  slConfig.saveLeaders(stringData);
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
  setTheme,
  saveBestTime
};
