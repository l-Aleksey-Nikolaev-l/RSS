import * as slConfig from '../save_load_config.js';
import * as audio from '../audio.js';
import * as vars from '../variables.js';
import { setAnswer } from './manage_answer.js';
import { fillTable } from './fill_table.js';
import { setSaveResumeButton, setGameByLevel } from '../game_logic.js';

function resumeGame(event, table) {
  slConfig.getLastConfig();
  audio.setBlockAudio(true);
  setSaveResumeButton('save');
  const lastSave = vars.resumeLastGame().game.answerCells;
  setGameByLevel(event, vars.currentLevelId, table[0]);
  for (const sign in lastSave) {
    restoreData([sign], lastSave[sign]);
  }
}

function restoreData(sign, dataArray) {
  const cells = document.querySelectorAll('.field__cell');
  dataArray.forEach((cell) => {
    const colIndex = cells[cell].dataset.col;
    const rowIndex = cells[cell].dataset.row;
    setAnswer(sign, colIndex, rowIndex);
  });
  fillTable(sign, dataArray);
}

export {
  resumeGame
};
