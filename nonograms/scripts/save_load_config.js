import { getAppConfig } from './variables.js';
import { loadSavedData } from './game_logic.js';

function saveCurrentGame() {
  const currentConfig = getAppConfig();
  const stringConfig = JSON.stringify(currentConfig);
  localStorage.setItem('rss_nonograms', stringConfig);
}

function getLastConfig() {
  let savedData = localStorage.getItem('rss_nonograms');
  savedData = JSON.parse(savedData);
  if (savedData) {
    loadSavedData(savedData);
  }
}

export {
  saveCurrentGame,
  getLastConfig
};
