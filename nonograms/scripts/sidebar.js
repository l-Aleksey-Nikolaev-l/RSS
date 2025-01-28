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
    const audioContainer = this.#createContainer('audio');
    const containerTitle = document.createElement('p');
    containerTitle.classList.add('settings__container__title');
    containerTitle.textContent = 'Audio';
    const musicSet = {
      name: 'music',
      label: 'Background music',
      state: this.musicState,
      volume: this.musicVolume
    };
    const fillEffectSet = {
      name: 'fill',
      label: 'Cell fill',
      state: this.effectFillState,
      volume: this.effectFillVolume
    };
    const crossEffectSet = {
      name: 'cross',
      label: 'Cell cross',
      state: this.effectCrossState,
      volume: this.effectCrossVolume
    };
    const eraseEffectSet = {
      name: 'erase',
      label: 'Cell erase',
      state: this.effectEraseState,
      volume: this.effectEraseVolum
    };

    const musicSetting = this.#createAudioSetting(musicSet);
    const fillEffectSetting = this.#createAudioSetting(fillEffectSet);
    const crossEffectSetting = this.#createAudioSetting(crossEffectSet);
    const eraseEffectSetting = this.#createAudioSetting(eraseEffectSet);
    audioContainer.append(
      containerTitle,
      musicSetting,
      fillEffectSetting,
      crossEffectSetting,
      eraseEffectSetting
    );
    return audioContainer;
  }

  #createAudioSetting(args) {
    const audioContainer = this.#createContainer('audio__setting');
    const audioTurnContainer = this.#createContainer('audio__turn');
    const audioCheckBox = this.#createCheckBoxElement(args);
    const audioLabel = this.#createSettingLabel(args);
    const audioVolumeRange = this.#createRangeElement(args);
    audioTurnContainer.append(audioCheckBox, audioLabel);
    audioContainer.append(audioTurnContainer, audioVolumeRange);
    return audioContainer;
  }

  #createSettingLabel(args) {
    const settingLabel = document.createElement('label');
    settingLabel.classList.add('audio__label');
    settingLabel.setAttribute('for', `${args.name}__play`);
    settingLabel.textContent = args.label;
    return settingLabel;
  }

  #createCheckBoxElement(args) {
    const musicCheckBox = document.createElement('input');
    musicCheckBox.classList.add('audio__checkbox');
    musicCheckBox.type = 'checkbox';
    musicCheckBox.id = `${args.name}__play`;
    musicCheckBox.name = `${args.name}__play`;
    musicCheckBox.checked = args.state;
    return musicCheckBox;
  }

  #createRangeElement(args) {
    const rangeSetting = document.createElement('input');
    rangeSetting.classList.add('audio__volume');
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
    const sidebarContainer = this.#createContainer('sidebar');
    const audioSettings = this.#createAudioSettings();
    sidebarContainer.append(audioSettings);
    sidebar.append(sidebarContainer);
    return sidebar;
  }

}

export {
  Sidebar
};
