const table = document.getElementsByClassName('nonograms__table');
let currentCell = null;
let prevCell = null;

function tableListeners() {
  table[0].addEventListener('mousedown', (event) => {
    setStatus(event);
  });

  table[0].addEventListener('mouseup', () => {
    currentCell = null;
    prevCell = null;
  });

  table[0].addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  table[0].addEventListener('mousemove', (event) => {
    setStatus(event);
  });
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
