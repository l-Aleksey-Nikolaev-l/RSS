import { LevelsMenu } from './levels_menu.js';
import { Button } from './button.js';
import { isConfigLoaded } from '../variables.js';

class Header {

  constructor() {
    this.levelsMenu = new LevelsMenu();
    this.button = new Button();
    this.isConfigLoaded = isConfigLoaded;
  }

  createHeaderSection() {
    const header = document.createElement('header');
    header.classList.add('header');
    const levelsMenu = this.levelsMenu.createLevelsMenu();
    const settingsButton = this.button.createButton('settings', '');
    const repeatButton = this.button.createButton('repeat', 'Play again');
    const randomGameButton = this.button.createButton('random');
    const buttonName = this.isConfigLoaded ? 'resume' : 'save';
    const saveButton = this.button.createButton(buttonName, buttonName);

    header.append(
      saveButton,
      repeatButton,
      randomGameButton,
      levelsMenu,
      settingsButton
    );
    return header;
  }

}

export {
  Header
};
