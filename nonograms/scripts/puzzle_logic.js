class Puzzle {

  constructor() {

  }

  calculatePicMatrix(picMatrix) {
    const tipsArray = [];
    let subArray = [];
    let cellsSum = 0;
    picMatrix.forEach((cellsArray) => {
      subArray = [];
      cellsSum = 0;
      for (let i = 0; i < cellsArray.length; i += 1) {
        if (cellsArray[i] === 0 && cellsSum === 0) {
          continue;
        }
        if (cellsArray[i] === 0 && cellsSum !== 0) {
          subArray.push(cellsSum);
          cellsSum = 0;
          continue;
        }
        cellsSum += 1;
        if (i === cellsArray.length - 1) {
          subArray.push(cellsSum);
          cellsSum = 0;
        }
      }
      tipsArray.push(subArray);
    });
    return tipsArray;
  }

  getPicByTips() {

  }

  getTipsByPic() {

  }

  getTipsByPic(picData) {
    const tipsOfPicture = {};
    for (const dataArray in picData) {
      tipsOfPicture[dataArray] = this.calculatePicMatrix(picData[dataArray]);
    }
    return tipsOfPicture;
  }
}

export {
  Puzzle
};
