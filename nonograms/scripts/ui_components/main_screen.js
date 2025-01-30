import { Header } from './header.js';
import { GameSection } from './game_section.js';
import { Footer } from './footer.js';

class MainScreen {

  constructor() {
    this.headerSection = new Header();
    this.gameSection = new GameSection();
    this.footerSection = new Footer();
    this.#createMainScreen();
  }

  #createContainer(name) {
    const main = document.createElement(name);
    main.classList.add(name);
    return main;
  }

  #createWrapper() {
    const mainContainer = this.#createContainer('main');
    const overlay = this.#createContainer('overlay');
    const header = this.headerSection.createHeaderSection();
    const game = this.gameSection.createGameSection();
    const footer = this.footerSection.createFooterSection();
    mainContainer.append(overlay, header, game, footer);
    return mainContainer;
  }

  #createMainScreen() {
    const body = document.getElementsByClassName('body')[0];
    body.classList.add('bg__light');
    const wrapper = this.#createWrapper();
    body.append(wrapper);
  }
}

export {
  MainScreen
};
