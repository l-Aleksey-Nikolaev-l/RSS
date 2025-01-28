import { Header } from './ui_components/header.js';
import { GameSection } from './ui_components/game_section.js';
import { Footer } from './ui_components/footer.js';

class MainScreen {

  constructor() {
    this.headerSection = new Header();
    this.gameSection = new GameSection();
    this.footerSection = new Footer();
  }

  #createMainContainer() {
    const main = document.createElement('main');
    main.classList.add('main');
    return main;
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
