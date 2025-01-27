class Puzzle {

  constructor(picObject = {}) {
    this.picCols = picObject.col_tips;
    this.picRows = picObject.row_tips;
    this.picSize = picObject.col_tips?.length;
    this.matrix = new Array(this.picSize).fill(null).map(() => {
      return new Array(this.picSize).fill(0);
    });
  }

  startGetting(row, col) {
    if (row === this.picSize) {
      return true;
    }

    const nextRow = row + (col + 1 === this.picSize ? 1 : 0);
    const nextCol = (col + 1) % this.picSize;

    this.matrix[row][col] = 1;
    if (
      this.checkMatrix(this.matrix, row, col) &&
      this.startGetting(nextRow, nextCol)) {
      return true;
    }

    this.matrix[row][col] = 0;
    if (
      this.checkMatrix(this.matrix, row, col) &&
      this.startGetting(nextRow, nextCol)
    ) {
      return true;
    }
  }

  checkMatrix(matrix, row, col) {
    const rowValue = (index) => {
      return matrix[row][index];
    };

    const colValue = (index) => {
      return matrix[index][col];
    };

    const colCheck =
      this.checkArray(this.picCols[col], this.picSize, row, colValue);
    const rowCheck =
      this.checkArray(this.picRows[row], this.picSize, col, rowValue);

    if (colCheck && rowCheck) {
      return true;
    }
  }

  checkArray(tipsArray, picSize, position, colRowValue) {
    let tipPivot = 0;
    let sequence = 0;
    let isLastValue = false;
    for (let index = 0; index <= position; index += 1) {
      if (colRowValue(index) === 1) {
        sequence += 1;
        if (!isLastValue && tipPivot >= tipsArray.length) {
          return false;
        }
        isLastValue = true;
      } else {
        if (isLastValue) {
          if (tipsArray[tipPivot] !== sequence) {
            return false;
          }
          sequence = 0;
          tipPivot++;
        }
        isLastValue = false;
      }
    }

    if (position === picSize - 1) {
      if (isLastValue) {
        return tipPivot === tipsArray.length - 1 &&
          sequence === tipsArray[tipPivot];
      } else {
        return tipPivot === tipsArray.length;
      }
    } else {
      if (isLastValue) {
        return sequence <= tipsArray[tipPivot];
      }
    }
    return true;
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
    return this.startGetting(0, 0) ? this.matrix : false;
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
