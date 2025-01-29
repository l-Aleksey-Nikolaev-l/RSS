import {
  manageHeader,
  setCellStatus,
  mouseButtonUp,
  sidebarSettings
} from './game_logic.js';

const header = document.getElementsByClassName('header');
const sidebar = document.getElementsByClassName('sidebar');
const table = document.getElementsByClassName('nonograms__table');

function startSidebarListeners() {
  sidebar[0].addEventListener('input', sidebarSettings);
}

function startListeners() {
  header[0].addEventListener('click', manageHeader);

  table[0].addEventListener('mousedown', setCellStatus);

  table[0].addEventListener('mouseup', mouseButtonUp);

  table[0].addEventListener('contextmenu', (event) => event.preventDefault());

  table[0].addEventListener('mousemove', setCellStatus);
}

export {
  startListeners,
  startSidebarListeners
};
