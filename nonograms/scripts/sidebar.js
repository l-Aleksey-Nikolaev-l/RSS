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
    this.musicState = musicState;
    this.musicVolume = musicVolume;
    this.effectFillState = effectFillState;
    this.effectFillVolume = effectFillVolume;
    this.effectCrossState = effectCrossState;
    this.effectCrossVolume = effectCrossVolume;
    this.effectEraseState = effectEraseState;
    this.effectEraseVolum = effectEraseVolume;
  }


  #createBestTimeTable() {
    const bestTimeContainer = this.#createContainer('best__time');
    return bestTimeContainer;
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
