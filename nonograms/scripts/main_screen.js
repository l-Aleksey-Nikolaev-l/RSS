class MainScreen {

  tempSize = 15;

  #createMainContainer() {
    const main = document.createElement('main');
    main.classList.add('main');
    return main;
  }

  #createHeaderSection() {
    const header = document.createElement('header');
    header.classList.add('header');
    return header;
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

const mainScreen = new MainScreen().createMainScreen();

export {
  mainScreen
};
