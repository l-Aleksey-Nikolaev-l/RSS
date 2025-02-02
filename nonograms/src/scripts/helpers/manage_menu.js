import * as overlay from './manage_overlay.js';
import { manageHeader } from '../game_logic.js';

let menuLevel = null;
let prevLevel = null;
let prevPicture = null;

function tapOnMenu(event) {
  const isMenu = event.target.classList.contains('level__menu_item');
  const isMenuLevel = event.target.classList.contains('level__item');
  const isLevelImage = event.target.classList.contains('level__image');

  if (isMenu || isMenuLevel || isLevelImage) {
    event.preventDefault();
  }

  if (isMenu) {
    menuLevel = event.target;
    event.target.classList.toggle('menu__tap');
    overlay.isOverlayShown ?
      overlay.removeOverlay(event) :
      overlay.setOverlay(event);
    return;
  }

  if (isMenuLevel && event.target !== prevLevel) {
    event.target.classList.add('menu__level_hover');
    prevLevel?.classList.remove('menu__level_hover');
    prevPicture?.classList.remove('menu__image_hover');
    prevLevel = event.target;
    prevPicture = null;
    return;
  }

  if (isLevelImage && event.target !== prevPicture) {
    event.target.classList.add('menu__image_hover');
    prevPicture?.classList.remove('menu__image_hover');
    prevPicture = event.target;
    manageHeader(event);
  }
}

function resetMenus() {
  const sidebar = document.getElementsByClassName('sidebar');
  sidebar[0]?.classList.remove('sidebar__active');
  menuLevel?.classList.remove('menu__tap');
  prevLevel?.classList.remove('menu__level_hover');
  prevPicture?.classList.remove('menu__image_hover');
  prevLevel = null;
  prevPicture = null;
}

export {
  menuLevel,
  prevLevel,
  prevPicture,
  tapOnMenu,
  resetMenus
};
