import { Table } from './ui_components/table.js';
import { mainScreenParams, setLevelGrid } from './variables.js';
import { manageCell } from './game_logic.js';
import { resetTimer } from './timer.js';

const levelsMenu = document.getElementsByClassName('level__menu');
const table = document.getElementsByClassName('nonograms__table');
import { setGameLevel, setCellStatus } from './game_logic.js';

function gameListeners() {
  levelsMenu[0].addEventListener('click', (event) => {
    setGameLevel(event, table[0]);
  });

  table[0].addEventListener('mousedown', setCellStatus);

  table[0].addEventListener('mouseup', () => {
    currentCell = null;
    prevCell = null;
  });

  table[0].addEventListener('contextmenu', (event) => event.preventDefault());

  table[0].addEventListener('mousemove', setCellStatus);
}

export {
  gameListeners
};
