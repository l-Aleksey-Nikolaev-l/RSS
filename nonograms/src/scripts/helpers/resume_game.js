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
  dataArray.forEach((row, row_index) => {
    row.forEach((cell, col_index) => {
      if (cell === 1) {
        setAnswer(sign, col_index, row_index);
      }
    });
  });
}

export {
  resumeGame
};
