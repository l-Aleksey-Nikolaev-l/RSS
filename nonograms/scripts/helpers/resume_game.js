import * as slConfig from '../save_load_config.js';
import * as audio from '../audio.js';
import * as vars from '../variables.js';
import { Puzzle } from '../puzzle_logic.js';
import { setAnswer } from './manage_answer.js';
import { fillTable } from './fill_table.js';
import { setSaveResumeButton, setGameByLevel } from '../game_logic.js';

function resumeGame(event, table) {
  slConfig.getLastConfig();
  audio.setBlockAudio(true);
  setSaveResumeButton('save');
  const lastSave = vars.resumeLastGame().game.answerCells;
  const colTips = lastSave.col_tips;
  const rowTips = lastSave.row_tips;
  const colCross = lastSave.col_cross;
  const rowCross = lastSave.row_cross;
  setGameByLevel(event, vars.currentLevelId, table[0]);
  const picArray = new Puzzle(colTips, rowTips).getPicByTips();
  const crossArray = new Puzzle(colCross, rowCross).getPicByTips();
  restoreData(['fill'], picArray);
  restoreData(['cross'], crossArray);
  fillTable(['fill'], picArray.flat());
  fillTable(['cross'], crossArray.flat());
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
