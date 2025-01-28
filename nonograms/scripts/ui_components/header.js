import { LevelsMenu } from './levels_menu.js';
import { Button } from './button.js';

class Header {

  constructor() {
    this.levelsMenu = new LevelsMenu();
    this.button = new Button();
  }

  createHeaderSection() {
    const header = document.createElement('header');
    header.classList.add('header');
    const levelsMenu = this.levelsMenu.createLevelsMenu();
    const settingsButton = this.button.createButton('settings', '');
    const repeatButton = this.button.createButton('repeat', 'Play again');
    const randomGameButton = this.button.createButton('random');
    const saveButton = this.button.createButton('save', 'save');

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
