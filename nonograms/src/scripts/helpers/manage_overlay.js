import * as listeners from '../listeners.js';
import { resetMenus } from './manage_menu.js';

let isOverlayShown = false;

function setOverlay(event) {
  isOverlayShown = true;
  listeners.setOverlayListeners(event, true);
}

function removeOverlay(event) {
  isOverlayShown = false;
  listeners.setOverlayListeners(event, false);
  resetMenus();
}

export {
  isOverlayShown,
  setOverlay,
  removeOverlay
};
