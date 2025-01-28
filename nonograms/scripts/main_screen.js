class MainScreen {

  constructor(args = {
    currentLevelId: 0,
    gridSize: 0,
    pictures: {}
  }) {
    this.levelId = args.currentLevelId;
    this.gridSize = args.gridSize;
    this.pictures = args.pictures;
    this.setAnswerArraySize = args.setAnswerArraySize;
  }

  #createMainContainer() {
    const main = document.createElement('main');
    main.classList.add('main');
    return main;
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
    const picture = this.pictures[this.levelId];
    for (let index = 0; index <= this.gridSize; index += 1) {
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

  createMainScreen() {
    const mainContainer = this.#createMainContainer();
    const header = this.#createHeaderSection();
    const gameSection = this.#createGameSection();
    const footer = this.#createFooterSection();
    mainContainer.append(header, gameSection, footer);
    this.setAnswerArraySize(this.gridSize);
    return mainContainer;
  }
}

export {
  MainScreen
};
