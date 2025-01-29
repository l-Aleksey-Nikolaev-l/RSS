import { gridSize, setAnswerMatrixSize } from '../variables.js';
import { getPuzzleNameLevel } from '../game_logic.js';

class Table {

  constructor({...args}) {
    this.levelId = args.levelId;
    this.gridSize = args.gridSize;
    this.pictures = args.pictures;
    setAnswerMatrixSize(gridSize);
  }

  createTable() {
    const table = document.createElement('table');
    table.classList.add('nonograms__table');
    return this.createTableGrid(table);
  }

  createTableGrid(newTable) {
    if (!newTable) {
      return;
    }
    const newCaption = this.#createTableCaption();
    newTable.append(newCaption);
    this.#addTopTips(newTable);
    this.#addRows(newTable);
    return newTable;
  }

  #createTableCaption() {
    const caption = document.createElement('caption');
    caption.classList.add('table__caption');
    const puzzleNameLevel = document.createElement('p');
    puzzleNameLevel.classList.add('puzzle__name_level');
    puzzleNameLevel.textContent = getPuzzleNameLevel();
    const spendTime = document.createElement('p');
    spendTime.classList.add('puzzle__spend_time');
    spendTime.textContent = '00:00';
    caption.append(puzzleNameLevel, spendTime);
    return caption;
  }

  #addTopTips(table) {
    const tr = document.createElement('tr');
    tr.classList.add('top__tips');
    const picture = this.pictures[this.levelId];
    for (let index = 0; index <= this.gridSize; index += 1) {
      const th = document.createElement('th');
      if (index !== 0) {
        th.classList.add('tips', 'col__tips');
        th.setAttribute('data-col_tips', String(index));
        th.textContent = picture.col_tips[index - 1].join('\n');
      } else {
        th.classList.add('col__answer');
        const span = document.createElement('span');
        span.classList.add('show__answer');
        span.textContent = 'Solve';
        th.append(span);
      }
      tr.append(th);
    }
    table.append(tr);
  }

  #addRows(table) {
    const picture = this.pictures[this.levelId];
    for (let rowIndex = 0; rowIndex < this.gridSize; rowIndex += 1) {
      const tr = document.createElement('tr');
      tr.classList.add('row__cells');
      const th = document.createElement('th');
      th.classList.add('tips', 'row__tips');
      th.setAttribute('data-row_tips', String(rowIndex + 1));
      th.textContent = picture.row_tips[rowIndex].join('\n');
      tr.append(th);
      for (let cellIndex = 0; cellIndex < this.gridSize; cellIndex += 1) {
        const td = document.createElement('td');
        td.classList.add('field__cell');
        td.setAttribute('data-col', String(cellIndex));
        td.setAttribute('data-row', String(rowIndex));
        tr.append(td);
      }
      table.append(tr);
    }
  }
}

export {
  Table
};
