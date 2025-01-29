import {
  musicState,
  musicVolume,
  effectFillState,
  effectFillVolume,
  effectCrossState,
  effectCrossVolume,
  effectEraseState,
  effectEraseVolume,
  isDarkTheme
} from '../variables.js';

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
    this.isDarkTheme = isDarkTheme;
  }

  #createContainer(name) {
    const settingContainer = document.createElement('div');
    settingContainer.classList.add(`${name}__container`);
    return settingContainer;
  }

  #createAudioSettings() {
    const audioContainer = this.#createContainer('audio');
    const containerTitle = document.createElement('p');
    containerTitle.classList.add('audio__container__title');
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

  #createThemeSettings() {
    const themesContainer = this.#createContainer('themes');
    const switchContainer = this.#createContainer('themes__switch');
    const containerTitle = document.createElement('p');
    containerTitle.classList.add('theme__container__title');
    containerTitle.textContent = 'Themes';
    const leftText = document.createElement('p');
    leftText.textContent = 'Light';
    const rightText = document.createElement('p');
    rightText.textContent = 'Dark';
    const switchLabel = document.createElement('label');
    switchLabel.classList.add('themes__switch_label');
    const themeSwitch = document.createElement('input');
    themeSwitch.classList.add('themes__switch');
    themeSwitch.type = 'checkbox';
    themeSwitch.id = 'themes__switch';
    themeSwitch.checked = this.isDarkTheme;
    const span = document.createElement('span');
    span.classList.add('switch__slider', 'switch__round');
    switchLabel.append(themeSwitch, span);
    switchContainer.append(leftText, switchLabel, rightText);
    themesContainer.append(containerTitle, switchContainer);
    return themesContainer;
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
    const containerTitle = document.createElement('p');
    containerTitle.classList.add('time__container__title');
    containerTitle.textContent = 'Best time';
    const timeTable = this.#createTable();
    bestTimeContainer.append(containerTitle, timeTable);
    return bestTimeContainer;
  }

  #createTable() {
    const timeTable = document.createElement('table');
    timeTable.classList.add('time__table');
    const headerRow = document.createElement('tr');
    headerRow.classList.add('time__table_header');
    const headerTitles = ['Place', 'Picture name', 'Level', 'Time'];
    headerTitles.forEach((cellName) => {
      const headerCell = document.createElement('th');
      headerCell.classList.add('time__table_header_cell');
      headerCell.textContent = cellName;
      headerRow.append(headerCell);
    });
    timeTable.append(headerRow);
    return timeTable;
  }

  createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar', 'sidebar__active');
    const sidebarContainer = this.#createContainer('sidebar');
    const themeSetting = this.#createThemeSettings();
    const audioSettings = this.#createAudioSettings();
    const bestTime = this.#createBestTimeTable();
    sidebarContainer.append(themeSetting ,audioSettings, bestTime);
    sidebar.append(sidebarContainer);
    return sidebar;
  }

}

export {
  Sidebar
};
