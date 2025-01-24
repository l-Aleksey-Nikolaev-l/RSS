import { MainScreen } from './main_screen.js';
import { setLevelGrid } from './variables.js';
const levelsMenu = document.getElementsByClassName('level__menu');
const table = document.getElementsByClassName('nonograms__table');

let currentCell = null;
let prevCell = null;

function gameListeners() {
  levelsMenu[0].addEventListener('click', setGameLevel);

  table[0].addEventListener('mousedown', setCellStatus);

  table[0].addEventListener('mouseup', () => {
    currentCell = null;
    prevCell = null;
  });

  table[0].addEventListener('contextmenu', (event) => event.preventDefault());

  table[0].addEventListener('mousemove', setCellStatus);
}

function setGameLevel(event) {
  const levelId = event.target.dataset.levelId;
  if (levelId) {
    setLevelGrid(levelId);
    const mainScreen = new MainScreen();
    while (table[0].rows.length) {
      table[0].deleteRow(0);
    }
    mainScreen.createTableGrid(table[0]);
  }
}

function setCellStatus(event) {
  const cell = event.target;
  const cellId = cell.dataset.id;
  const mouseButton = event.which;
  const mouseEventType = event.type;
  currentCell = cellId;
  if (!cellId || currentCell === prevCell) {
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
}

export {
  gameListeners
};
