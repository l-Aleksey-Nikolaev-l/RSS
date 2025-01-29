const header = document.getElementsByClassName('header');
const table = document.getElementsByClassName('nonograms__table');

import { manageHeader ,setCellStatus, mouseButtonUp } from './game_logic.js';

function startListeners() {
  header[0].addEventListener('click', manageHeader);

  table[0].addEventListener('mousedown', setCellStatus);

  table[0].addEventListener('mouseup', mouseButtonUp);

  table[0].addEventListener('contextmenu', (event) => event.preventDefault());

  table[0].addEventListener('mousemove', setCellStatus);
}

export {
  startListeners
};
