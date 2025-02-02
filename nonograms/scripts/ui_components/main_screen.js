import { Header } from './header.js';
import { GameSection } from './game_section.js';
import { getAppSettings, getLastConfig } from '../save_load_config.js';
import { setTheme } from '../game_logic.js';
import { isDarkTheme } from '../variables.js';

class MainScreen {

  constructor() {
    getAppSettings();
    getLastConfig();
    this.headerSection = new Header();
    this.gameSection = new GameSection();
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
    mainContainer.append(overlay, header, game);
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
