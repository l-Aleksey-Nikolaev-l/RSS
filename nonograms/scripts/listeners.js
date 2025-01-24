import { MainScreen } from './main_screen.js';
import { setLevelGrid } from './variables.js';
const menuLevels = document.getElementsByClassName('level__menu');
const table = document.getElementsByClassName('nonograms__table');
let currentCell = null;
let prevCell = null;

function tableListeners() {
  menuLevels[0].addEventListener('click', setLevel);

  table[0].addEventListener('mousedown', setStatus);

  table[0].addEventListener('mouseup', () => {
    currentCell = null;
    prevCell = null;
  });

  table[0].addEventListener('contextmenu', (event) => event.preventDefault());

  table[0].addEventListener('mousemove', setStatus);
}

function setLevel(event) {
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

function setStatus(event) {
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
  tableListeners
};
