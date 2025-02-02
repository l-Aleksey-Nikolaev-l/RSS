import * as listeners from '../listeners.js';
import * as vars from '../variables.js';
import * as slConfig from '../save_load_config.js';
import { setTheme } from '../game_logic.js';
import { refreshBestTimeTable } from './manage_best_time.js';
import { Sidebar } from '../ui_components/sidebar.js';

function toggleSidebar() {
  const sidebar = document.getElementsByClassName('sidebar');
  if (!sidebar[0]) {
    const gameSection = document.getElementsByClassName('game__section');
    const newSidebar = new Sidebar().createSidebar();
    gameSection[0].append(newSidebar);
    listeners.startSidebarListeners();
  } else {
    const themeSwitch = document.getElementById('themes__switch');
    themeSwitch.checked = vars.isDarkTheme;
    sidebar[0].classList.toggle('sidebar__active');
  }
  const isSidebarShown = sidebar[0].classList.contains('sidebar__active');
  isSidebarShown && refreshBestTimeTable();
}

function sidebarSettings(event) {
  const inputType = event.target.type;
  const inputId = event.target.id;
  if (inputType === 'checkbox' && inputId === 'themes__switch') {
    const state = event.target.checked;
    vars.setThemeState(state);
    setTheme(state);
  } else if (inputType === 'checkbox') {
    const state = event.target.checked;
    vars.setAudioState(inputId, state);
  } else if (inputType === 'range') {
    const value = event.target.value;
    vars.setAudioVolume(inputId, value);
  }
  setTimeout(() => {
    slConfig.saveAppSettings();
  }, 1000);
}

export {
  toggleSidebar,
  sidebarSettings
};
