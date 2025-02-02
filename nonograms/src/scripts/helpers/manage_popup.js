import * as timer from '../timer.js';
import * as listeners from '../listeners.js';
import { setBlock } from '../game_logic.js';
import { Popup } from '../ui_components/popup.js';

function showPopUp() {
  timer.stopTimer(true);
  setBlock(true);
  const gameSection = document.getElementsByClassName('game__section');
  const popup = new Popup().createPopUp();
  gameSection[0].prepend(popup);
  listeners.startPopupListener();
}

function removePopup() {
  const popup = document.getElementsByClassName('popup__window');
  popup[0]?.remove();
}

export {
  showPopUp,
  removePopup
};
