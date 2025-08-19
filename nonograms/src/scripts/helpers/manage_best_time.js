import * as timer from '../timer.js';
import * as slConfig from '../save_load_config.js';
import { getPuzzleNameLevel } from './puzzle_name.js';
import { Sidebar } from '../ui_components/sidebar.js';

function saveBestTime(winnersTime) {
  const leadersData = slConfig.getLeaders();
  let savedData = JSON.parse(leadersData);
  const puzzleNameLevel = getPuzzleNameLevel();
  const formatedTime = timer.convertSecondsToTime(winnersTime);
  const currentData = [1, puzzleNameLevel[0], puzzleNameLevel[1], formatedTime];
  if (!savedData) {
    savedData = [currentData];
  } else {
    for (let index = 0; index < 5; index += 1) {
      if (!savedData[index]) {
        savedData.push(currentData);
        break;
      }
      const savedTime = Number(savedData[index][3].replace(':', ''));
      const currentTime = Number(currentData[3].replace(':', ''));
      savedData[index][0] = index + 1;

      if (currentTime < savedTime) {
        savedData.splice(index, 0, currentData);
        break;
      }
    }
    savedData.forEach((_, index) => {
      savedData[index][0] = index + 1;
    });
  }
  const stringData = JSON.stringify(savedData.slice(0, 5));
  slConfig.saveLeaders(stringData);
}

function refreshBestTimeTable() {
  const leaderTable = document.getElementsByClassName('time__table');
  const leadersData = slConfig.getLeaders();
  if (!leadersData) {
    return;
  }
  while (leaderTable[0].rows.length !== 1) {
    leaderTable[0].deleteRow(1);
  }
  const savedData = JSON.parse(leadersData);
  savedData.forEach((leader) => {
    const leaderItem = new Sidebar().createBestTimeItem(leader);
    leaderTable[0].append(leaderItem);
  });
}

export {
  saveBestTime,
  refreshBestTimeTable
};
