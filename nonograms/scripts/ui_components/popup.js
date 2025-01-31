import { winnerTime } from '../variables.js';

class Popup {

  constructor() {
    this.beginText = 'Great!\nYou have solved\nthe nonogram\nin';
    this.time = winnerTime;
    this.endText = 'seconds!';
  }

  #createContainer(name) {
    const main = document.createElement('div');
    main.classList.add(`popup__${name}`);
    return main;
  }

  createPopUp() {
    const popupContainer = this.#createContainer('window');
    const popupWrapper = this.#createContainer('wrapper');
    const popupCloseButton = this.#createContainer('close_button');
    const popupImage = this.#createContainer('image');
    const popupCongrats = this.#createContainer('congrats');
    const popupText = document.createElement('p');
    popupText.classList.add('congrats__text');
    popupText.textContent = `${this.beginText} ${this.time} ${this.endText}`;
    const popupTime = document.createElement('span');
    popupTime.classList.add('congrats__time');
    popupText.append(popupTime);
    popupCongrats.append(popupText);
    popupWrapper.append(popupCloseButton, popupCongrats, popupImage);
    popupContainer.append(popupWrapper);
    return popupContainer;
  }

}

export {
  Popup
};
