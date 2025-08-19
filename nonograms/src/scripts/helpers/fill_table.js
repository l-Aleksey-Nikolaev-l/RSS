import * as vars from '../variables.js';

function fillTable(sign, picArray) {
  const cellsArray = document.querySelectorAll('.field__cell');
  picArray.forEach((value, index) => {
    setTimeout(() => {
      if (sign.includes('all')) {
        if (value !== 0) {
          cellsArray[index].classList.remove('cross');
          cellsArray[index].classList.add('fill');
        } else {
          cellsArray[index].classList.remove('fill');
          cellsArray[index].classList.add('cross');
        }
      }
      if (sign.includes('fill')) {
        cellsArray[value].classList.add('fill');
      } else if (sign.includes('cross')) {
        cellsArray[value].classList.add('cross');
      }
    }, (25 / vars.gridSize) * index);
  });
}

export {
  fillTable
};
