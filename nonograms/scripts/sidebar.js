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

  #createContainer(name) {
    const settingContainer = document.createElement('div');
    settingContainer.classList.add(`${name}__container`);
    return settingContainer;
  }

  #createAudioSettings() {
  }

  #createSettingLabel(args) {
    const settingLabel = document.createElement('label');
    settingLabel.classList.add('setting__label');
    settingLabel.setAttribute('for', `${args.name}__play`);
    settingLabel.textContent = args.label;
    return settingLabel;
  }

  #createCheckBoxElement(args) {
    const musicCheckBox = document.createElement('input');
    musicCheckBox.type = 'checkbox';
    musicCheckBox.id = `${args.name}__play`;
    musicCheckBox.name = `${args.name}__play`;
    musicCheckBox.checked = args.state;
    return musicCheckBox;
  }

  #createRangeElement(args) {
    const rangeSetting = document.createElement('input');
    rangeSetting.type = 'range';
    rangeSetting.id = `audio__${args.name}__setting`;
    rangeSetting.name = `audio__${args.name}__setting`;
    rangeSetting.min = '0';
    rangeSetting.max = '1';
    rangeSetting.step = '0.1';
    rangeSetting.value = args.volume;
    return rangeSetting;
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
