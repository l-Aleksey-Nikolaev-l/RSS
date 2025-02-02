import * as timer from '../timer.js';
import * as vars from '../variables.js';
import { Puzzle } from '../puzzle_logic.js';
import { fillTable } from './fill_table.js';
import { setBlock } from '../game_logic.js';

function solvePuzzle(event) {
  const eventId = event.target.dataset.id;
  if (eventId === 'solve') {
    timer.stopTimer(false);
    setBlock(true);
    const colTips = vars.pictures[vars.currentLevelId].col_tips;
    const rowTips = vars.pictures[vars.currentLevelId].row_tips;
    const picArray = new Puzzle(colTips, rowTips).getPicByTips().flat();
    fillTable(['all'], picArray);
  }
}

export {
  solvePuzzle
};
