import {
  getGameConfig,
  setGameConfig,
  getAppConfig,
  setAppConfig
} from './variables.js';

function saveCurrentGame(answers) {
  const currentGameConfig = getGameConfig(answers);
  const stringConfig = JSON.stringify(currentGameConfig);
  localStorage.setItem('rss_nonograms', stringConfig);
}

function getLastConfig() {
  let savedData = localStorage.getItem('rss_nonograms');
  savedData = JSON.parse(savedData);
  if (savedData) {
    setGameConfig(savedData);
  }
}

function saveAppSettings() {
  const currentAppConfig = getAppConfig();
  const stringConfig = JSON.stringify(currentAppConfig);
  localStorage.setItem('rss_nonograms_set', stringConfig);
}

function getAppSettings() {
  let configData = localStorage.getItem('rss_nonograms_set');
  configData = JSON.parse(configData);
  if (configData) {
    setAppConfig(configData);
  }
}

function saveLeaders(currentLeaders) {
  localStorage.setItem('rss_nonograms_leaders', currentLeaders);
}

function getLeaders() {
  const leadersData = localStorage.getItem('rss_nonograms_leaders');
  if (leadersData) {
    return leadersData;
  }
  return null;
}

export {
  saveCurrentGame,
  getLastConfig,
  saveAppSettings,
  getAppSettings,
  saveLeaders,
  getLeaders
};
