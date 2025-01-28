import { pictures } from '../pictures.js';

class LevelsMenu {

  constructor() {
    this.pictures = pictures;
  }

  createLevelsMenu() {
    const listBlock = document.createElement('ul');
    listBlock.classList.add('level__menu');
    const listItem = document.createElement('li');
    listItem.classList.add('level__menu_item');
    const listText = document.createElement('span');
    listText.classList.add('level__menu_text');
    listText.textContent = 'Levels';
    const levels = this.#createLevelsList(this.pictures);
    listItem.append(listText, levels);
    listBlock.append(listItem);
    return listBlock;
  }

  #createLevelsList(picsObject) {
    const levelsList = document.createElement('ul');
    levelsList.classList.add('level__items');
    const levelsNames = new Map();
    const picturesNames = new Map();
    let picturesCount = 0;

    for (const index in picsObject) {
      levelsNames.set(picsObject[index].level, '');
      picturesNames.set(picsObject[index].name, picsObject[index].level);
    }

    levelsNames.forEach((_, levelName) => {
      const levelItem = document.createElement('li');
      levelItem.classList.add('level__item');
      levelItem.textContent = levelName;
      const imagesList = document.createElement('ul');
      imagesList.classList.add('level__images');
      levelsList.append(levelItem);
      picturesNames.forEach((picLevel, picName) => {
        if (picLevel === levelName) {
          const picItem = document.createElement('li');
          picItem.classList.add('level__image');
          picItem.setAttribute('data-level-id', String(picturesCount));
          picturesCount += 1;
          picItem.textContent = picName;
          imagesList.append(picItem);
        }
        levelItem.append(imagesList);
      });
    });
    return levelsList;
  }

}

export {
  LevelsMenu
};
