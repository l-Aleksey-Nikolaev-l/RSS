import { currentLevelId, gridSize } from '../variables.js';
import { pictures } from '../pictures.js';
import { Sidebar } from './sidebar.js';
import { Table } from './table.js';

class GameSection {

  constructor() {
    this.tableParams = {
      levelId: currentLevelId,
      gridSize: gridSize,
      pictures: pictures
    };

    this.table = new Table(this.tableParams);
    this.sidebar = new Sidebar();
  }

  createGameSection() {
    const gameSection = document.createElement('section');
    gameSection.classList.add('game__section');
    const table = this.table.createTable();
    const sidebar = this.sidebar.createSidebar();
    gameSection.append(table, sidebar);
    return gameSection;
  }

}

export {
  GameSection
};
