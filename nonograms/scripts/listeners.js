import {
  tapOnMenu,
  manageHeader,
  solvePuzzle,
  setCellStatus,
  mouseButtonUp,
  removeOverlay,
  sidebarSettings
} from './game_logic.js';

const header = document.getElementsByClassName('header');
const sidebar = document.getElementsByClassName('sidebar');
const table = document.getElementsByClassName('nonograms__table');
const overlay = document.getElementsByClassName('overlay');

function startSidebarListeners() {
  sidebar[0].addEventListener('input', sidebarSettings);
}

function setOverlayListeners(event, isSet) {
  if (isSet) {
    overlay[0].addEventListener('click', removeOverlay);
    overlay[0].addEventListener('touchend', removeOverlay);
  } else {
    overlay[0].removeEventListener('click', removeOverlay);
    overlay[0].removeEventListener('touchend', removeOverlay);
  }
  event.preventDefault();
}

function startListeners() {
  header[0].addEventListener('touchend', tapOnMenu);

  header[0].addEventListener('click', manageHeader);

  table[0].addEventListener('click', solvePuzzle);

  table[0].addEventListener('mousedown', setCellStatus);

  table[0].addEventListener('mouseup', mouseButtonUp);

  table[0].addEventListener('contextmenu', (event) => event.preventDefault());

  table[0].addEventListener('mousemove', setCellStatus);
}

export {
  startSidebarListeners,
  setOverlayListeners,
  startListeners
};
