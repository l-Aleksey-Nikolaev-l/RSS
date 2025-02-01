  getGameConfig,
  setGameConfig,

function saveCurrentGame() {
  const currentGameConfig = getGameConfig();
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

export {
  saveCurrentGame,
  getLastConfig
};
