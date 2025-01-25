import {
  currentLevelId,
  gridSize,
  setAnswerArraySize
} from './variables.js';
import { pictures } from './pictures.js';

class MainScreen {

  #createMainContainer() {
    const main = document.createElement('main');
    main.classList.add('main');
    return main;
  }

  #createHeaderSection() {
    const header = document.createElement('header');
    header.classList.add('header');
    const tableSettings = this.#createLevelsList();
    header.append(tableSettings);
    return header;
  }

  #createLevelsList() {
    const listBlock = document.createElement('ul');
    listBlock.classList.add('level__menu');
    const listItem = document.createElement('li');
    listItem.classList.add('level__menu_item');
    const listText = document.createElement('span');
    listText.classList.add('level__menu_text');
    listText.textContent = 'Levels ▼';
    listItem.append(listText);
    return listBlock;
  }

  #createListBlock(listName, itemName, itemsObject, subItem) {
    return listBlock;
  }

  #createGameSection() {
    const gameSection = document.createElement('section');
    gameSection.classList.add('game__section');
    const table = this.#createTable();
    gameSection.append(table);
    return gameSection;
  }

  #createTable() {
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    table.classList.add('nonograms__table');
    caption.classList.add('table__caption');
    caption.textContent = '00:00';
    table.append(caption);
    return this.createTableGrid(table);
  }

  createTableGrid(newTable) {
    if (!newTable) {
      return;
    }
    this.#addTopTips(newTable);
    this.#addRows(newTable);
    return newTable;
  }

  #addTopTips(table) {
    const tr = document.createElement('tr');
    tr.classList.add('top__tips');
    const picture = pictures[currentLevelId];
    for (let index = 0; index <= gridSize; index += 1) {
      const th = document.createElement('th');
      if (index !== 0) {
        th.classList.add('tips', 'col__tips');
        th.setAttribute('data-col_tips', String(index));
        th.textContent = picture.col_tips[index - 1].join('\n');
      }
      tr.append(th);
    }
    table.append(tr);
  }

  #addRows(table) {
    let cellId = 1;
    const picture = pictures[currentLevelId];
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex += 1) {
      const tr = document.createElement('tr');
      tr.classList.add('row__cells');
      const th = document.createElement('th');
      th.classList.add('tips', 'row__tips');
      th.setAttribute('data-row_tips', String(rowIndex + 1));
      th.textContent = picture.row_tips[rowIndex].join('\n');
      tr.append(th);
      for (let cellIndex = 0; cellIndex < gridSize; cellIndex += 1) {
        const td = document.createElement('td');
        td.classList.add('field__cell');
        td.setAttribute('data-id', String(cellId));
        td.setAttribute('data-col', String(cellIndex));
        td.setAttribute('data-row', String(rowIndex));
        tr.append(td);
        cellId += 1;
      }
      table.append(tr);
    }
  }

  #createFooterSection() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    return footer;
  }

  createMainScreen() {
    const mainContainer = this.#createMainContainer();
    const header = this.#createHeaderSection();
    const gameSection = this.#createGameSection();
    const footer = this.#createFooterSection();
    mainContainer.append(header, gameSection, footer);
    setAnswerArraySize(gridSize);
    return mainContainer;
  }
}

export {
  MainScreen
};
