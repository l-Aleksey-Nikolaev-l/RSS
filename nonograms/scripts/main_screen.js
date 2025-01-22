class MainScreen {
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
    return gameSection;
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
