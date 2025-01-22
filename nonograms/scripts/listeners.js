const table = document.getElementsByClassName('nonograms__table');

function tableListeners() {
  table[0].addEventListener('mousedown', (event) => {
    setStatus(event);
  });

  table[0].addEventListener('mouseup', () => {
  });

  table[0].addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

function setStatus(event) {
  const cell = event.target;
  const cellId = cell.dataset.id;
  const mouseButton = event.type;
  if (cellId && mouseButton === 'mousedown') {
    cell.classList.toggle('fill');
    cell.classList.remove('cross');
  } else if (cellId && mouseButton === 'contextmenu') {
    cell.classList.toggle('cross');
    cell.classList.remove('fill');
  }
}

export {
  tableListeners
};
