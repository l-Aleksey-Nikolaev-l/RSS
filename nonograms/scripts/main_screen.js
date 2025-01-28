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
