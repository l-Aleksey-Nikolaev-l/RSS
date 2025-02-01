import { Header } from './header.js';
import { GameSection } from './game_section.js';
import { Footer } from './footer.js';
import { getLastConfig } from '../save_load_config.js';
import { setTheme } from '../game_logic.js';
import {  isDarkTheme } from '../variables.js';

class MainScreen {

  constructor() {
    getLastConfig();
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
    const wrapper = this.#createWrapper();
    body.append(wrapper);
    setTheme(isDarkTheme);
  }
}

export {
  MainScreen
};
