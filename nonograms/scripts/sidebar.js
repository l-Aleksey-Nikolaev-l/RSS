import {
  musicState,
  musicVolume,
  effectFillState,
  effectFillVolume,
  effectCrossState,
  effectCrossVolume,
  effectEraseState,
  effectEraseVolume
} from './variables.js';

class Sidebar {

  constructor() {

  }

  createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    return sidebar;
  }

}

export {
  Sidebar
};
