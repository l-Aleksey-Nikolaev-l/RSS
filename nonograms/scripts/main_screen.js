import { difficultySettings, picturesNames } from './variables.js';
class MainScreen {

  tempSize = 15;
  picturesCount = 0;

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
    const allImages = [];

    for (let index = 0; index < 3; index += 1) {
      const levelImages =
        this.#createListBlock('images', 'image', this.picsNames[index], null);
      allImages.push(levelImages);
    }
    const levelItems =
      this.#createListBlock('items', 'item', this.diffSettings, allImages);

    listItem.append(levelItems);
    listBlock.append(listItem);
    this.picturesCount = 0;
    return listBlock;
  }

  #createListBlock(listName, itemName, itemsObject, subItem) {
    const listBlock = document.createElement('ul');
    listBlock.classList.add(`level__${listName}`);
    const itemsQuantity = Object.keys(itemsObject).length;
    for (let index = 0; index < itemsQuantity; index += 1) {
      const listItem = document.createElement('li');
      listItem.classList.add(`level__${itemName}`);
      listItem.textContent = itemsObject[index];
      if (itemName === 'image') {
        listItem.setAttribute('data-level-id', String(this.picturesCount));
        this.picturesCount += 1;
      }
      if (subItem) {
        listItem.append(subItem[index]);
      }
      listBlock.append(listItem);
    }
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
    this.#addTopTips(table);
    this.#addRows(table);
    return table;
  }

  #addTopTips(table) {
    const tr = document.createElement('tr');
    tr.classList.add('top__tips');
    for (let index = 0; index <= this.tempSize; index += 1) {
      const th = document.createElement('th');
      if (index !== 0) {
        th.classList.add('tips', 'col__tips');
        th.setAttribute('data-col_tips', String(index));
        th.textContent = '122';
      }
      tr.append(th);
    }
    table.append(tr);
  }

  #addRows(table) {
    let cellId = 1;
    for (let rowIndex = 0; rowIndex < this.tempSize; rowIndex += 1) {
      const tr = document.createElement('tr');
      tr.classList.add('row__cells');
      const th = document.createElement('th');
      th.classList.add('tips', 'row__tips');
      th.setAttribute('data-row_tips', String(rowIndex + 1));
      th.textContent = '232';
      tr.append(th);
      for (let cellIndex = 0; cellIndex < this.tempSize; cellIndex += 1) {
        const td = document.createElement('td');
        td.classList.add('field__cell');
        td.setAttribute('data-id', String(cellId));
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
    return mainContainer;
  }
}

export {
  MainScreen
};
