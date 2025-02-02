import * as vars from './variables.js';
import * as timer from './timer.js';
import * as audio from './audio.js';
import * as popup from './helpers/manage_popup.js';
import * as overlay from './helpers/manage_overlay.js';
import * as slConfig from './save_load_config.js';
import { resumeGame } from './helpers/resume_game.js';
import { toggleSidebar } from './helpers/manage_sidebar.js';
import { setAnswer } from './helpers/manage_answer.js';
import { Table } from './ui_components/table.js';

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
  mouseButtonUp,
  manageHeader,
  setCellStatus,
  setSaveResumeButton,
  setGameByLevel,
  setTheme,
  setBlock,
};
