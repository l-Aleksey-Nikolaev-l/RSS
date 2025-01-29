import { Header } from './ui_components/header.js';
import { GameSection } from './ui_components/game_section.js';
import { Footer } from './ui_components/footer.js';

class MainScreen {

  constructor() {
    this.headerSection = new Header();
    this.gameSection = new GameSection();
    this.footerSection = new Footer();
  }

  #createContainer(name) {
    const main = document.createElement(name);
    main.classList.add(name);
    return main;
  }

  createMainScreen() {
    const mainContainer = this.#createContainer('main');
    const overlay = this.#createContainer('overlay');
    const header = this.headerSection.createHeaderSection();
    const game = this.gameSection.createGameSection();
    const footer = this.footerSection.createFooterSection();
    mainContainer.append(overlay, header, game, footer);
    return mainContainer;
  }
}

export {
  MainScreen
};
