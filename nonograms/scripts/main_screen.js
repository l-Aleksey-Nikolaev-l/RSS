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
    const header = this.headerSection.createHeaderSection();
    const game = this.gameSection.createGameSection();
    const footer = this.footerSection.createFooterSection();
    mainContainer.append(header, game, footer);
    return mainContainer;
  }
}

export {
  MainScreen
};
