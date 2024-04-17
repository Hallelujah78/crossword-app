// models
import { CellType } from "../models/Cell.model";
import Clue from "../classes/Clue";
import { Direction } from "../models/Direction.model";
import Answer from "../models/Answer.model";
import * as AllAnswers from "../data/answers2";

export const getCellAbove = (grid: CellType[], index: number) => {
  if (grid[index - Math.sqrt(grid.length)]) {
    return grid[index - Math.sqrt(grid.length)];
  }
};
export const getCellBelow = (grid: CellType[], index: number) => {
  if (grid[index + Math.sqrt(grid.length)]) {
    return grid[index + Math.sqrt(grid.length)];
  }
};

export const findRightEdge = (grid: CellType[]) => {
  const rightIndices: number[] = [];
  const gridLength: number = grid.length; // 169
  const sideLength = Math.sqrt(grid.length); // 13
  for (
    let index = sideLength - 1;
    index <= gridLength - 1;
    index += sideLength
  ) {
    rightIndices.push(index);
  }
  return rightIndices;
};

export const findLeftEdge = (grid: CellType[]) => {
  const leftIndices: number[] = [];
  const gridLength: number = grid.length; // 169
  const sideLength = Math.sqrt(grid.length); // 13
  for (let index = 0; index <= gridLength - sideLength; index += sideLength) {
    leftIndices.push(index);
  }
  return leftIndices;
};

export const findTopEdge = (grid: CellType[]) => {
  const topIndices: number[] = [];
  const sideLength = Math.sqrt(grid.length); // 13
  for (let index = 0; index < sideLength; ++index) {
    topIndices.push(index);
  }
  return topIndices;
};

export const findBottomEdge = (grid: CellType[]) => {
  const bottomIndices: number[] = [];
  const gridLength: number = grid.length; // 169
  const sideLength = Math.sqrt(grid.length); // 13
  for (let index = gridLength - 1; index >= gridLength - sideLength; --index) {
    bottomIndices.push(index);
  }
  return bottomIndices;
};

export const setClueNumbers = (grid: CellType[]) => {
  let currentClueNum = 0;
  for (const item of grid) {
    if (
      ((!item.top && !item.left) ||
        (item.top && !item.left && item.right) ||
        (!item.top && item.bottom)) &&
      !item.isVoid
    ) {
      item.clueNumber = (currentClueNum + 1).toString();
      currentClueNum++;
    } else {
      item.clueNumber = "";
    }
  }
};

export const updateSurroundingCells = (grid: CellType[], index: number) => {
  const cellAbove = getCellAbove(grid, index);
  const cellBelow = getCellBelow(grid, index);

  // if there's a cell to the left, update right value
  if (grid[index - 1] && !isLeftEdge(grid, index)) {
    grid[index - 1].right = !grid[index - 1].right;
  }
  // if there's a cell to the right, update left value
  if (grid[index + 1] && !isRightEdge(grid, index)) {
    grid[index + 1].left = !grid[index + 1].left;
  }
  // if there's a cell above, update bottom prop
  if (cellAbove) {
    cellAbove.bottom = !cellAbove.bottom;
  }
  // if there's a cell above, update bottom prop
  if (cellBelow) {
    cellBelow.top = !cellBelow.top;
  }
};

export const isLeftEdge = (grid: CellType[], index: number) => {
  return findLeftEdge(grid).includes(index);
};
export const isRightEdge = (grid: CellType[], index: number) => {
  return findRightEdge(grid).includes(index);
};

export const isTopEdge = (grid: CellType[], index: number) => {
  return findTopEdge(grid).includes(index);
};
export const isBottomEdge = (grid: CellType[], index: number) => {
  return findBottomEdge(grid).includes(index);
};

export const initializeGrid = (grid: CellType[]) => {
  const newGrid = grid.map((item, index) => {
    item.id = index;

    // is the square above a cell and not void?
    if (getCellAbove(grid, index)?.isVoid) {
      item.top = false; // false indicates it is a void
    }
    // if the square to the right of the current square is a void OR the current square is on the right side of the grid (thus it has nothing to its right), then set the "right" property to false.
    if (
      findRightEdge(grid).includes(index) ||
      (!findRightEdge(grid).includes(index) && grid[index + 1]?.isVoid)
    ) {
      item.right = false;
    }
    if (
      findTopEdge(grid).includes(index) ||
      (!findTopEdge(grid).includes(index) &&
        grid[index - Math.sqrt(grid.length)]?.isVoid)
    ) {
      item.top = false;
    }
    if (
      findBottomEdge(grid).includes(index) ||
      (!findBottomEdge(grid).includes(index) &&
        getCellBelow(grid, index)?.isVoid)
    ) {
      item.bottom = false;
    }
    if (
      findLeftEdge(grid).includes(index) ||
      (!findLeftEdge(grid).includes(index) && grid[index - 1]?.isVoid)
    ) {
      item.left = false;
    }

    return item;
  }); // end of map
  setClueNumbers(newGrid);

  createClues(newGrid);
  return newGrid;
};

export const createClues = (grid: CellType[]) => {
  const clues: Clue[] = [];
  const clueIndices = getClueIndices(grid);

  clueIndices.forEach((currIndex) => {
    // across clue
    if (grid[currIndex].right && !grid[currIndex].left) {
      const acrossClue = new Clue(
        `${currIndex}ACROSS`,
        1,
        Direction.ACROSS,
        [currIndex],
        [""],
        ""
      );

      let isCell = true;
      let startIndex = currIndex;
      while (isCell) {
        if (grid[startIndex].right) {
          acrossClue.length = acrossClue.length + 1;
          acrossClue.indices.push(startIndex + 1);
          acrossClue.answer.push("");
          startIndex++;
        } else {
          isCell = false;
        }
      }
      clues.push(acrossClue);
    }
    if (grid[currIndex].bottom && !grid[currIndex].top) {
      //
      const downClue = new Clue(
        `${currIndex}DOWN`,
        1,
        Direction.DOWN,
        [currIndex],
        [],
        ""
      );

      let isCell = true;
      let startIndex = currIndex;
      while (isCell) {
        if (grid[startIndex].bottom) {
          downClue.length = downClue.length + 1;
          const cellBelow = getCellBelow(grid, startIndex);
          if (cellBelow && cellBelow.id) {
            downClue.indices.push(+cellBelow.id);
            downClue.answer.push("");
            startIndex = +cellBelow.id;
          }
        } else {
          isCell = false;
        }
      }

      clues.push(downClue);
    }
  });
  // console.log("these are clues: ", clues);
  return clues;
};

export const getClueIndices = (grid: CellType[]) => {
  const clueIndices: number[] = [];
  grid.forEach((item, index) => {
    item.clueNumber && clueIndices.push(index);
  });
  return clueIndices;
};

export const populateClues = (
  clues: Clue[],
  AllAnswers: {
    three: Answer[];
    four: Answer[];
    five: Answer[];
    six: Answer[];
    seven: Answer[];
    eight: Answer[];
    nine: Answer[];
    ten: Answer[];
    eleven: Answer[];
    twelve: Answer[];
    thirteen: Answer[];
  }
) => {
  clues.forEach((clue) => {
    // let answer: string;
    let possibleAnswers: Answer[] = [];
    let regExp: RegExp;
    const randVal = Math.random();
    regExp = arrayToRegularExp(clue.answer)!;

    switch (clue.length) {
      case 13:
        possibleAnswers = AllAnswers.thirteen;
        if (clue.answer.includes("") && clue.answer.join("").length !== 0) {
          regExp = arrayToRegularExp(clue.answer)!;
          possibleAnswers = possibleAnswers.filter((answer) => {
            if (answer.word) {
              return answer.word.match(regExp);
            } else {
              return answer.raw.match(regExp);
            }
          });
        }
        // at this point possibleAnswers is all words N letters long, a filtered array of words N letters long, or possibly empty
        if (possibleAnswers.length !== 0) {
          clue.answer = [
            ...(possibleAnswers[Math.floor(randVal * possibleAnswers.length)]
              .word !== undefined
              ? possibleAnswers[Math.floor(randVal * possibleAnswers.length)]
                  .word!
              : possibleAnswers[Math.floor(randVal * possibleAnswers.length)]
                  .raw),
          ];
          clue.intersection?.forEach((item) => {
            const clueToUpdate = clues.find((clue) => {
              return clue.id === item.id;
            })!;
            // console.log(clueToUpdate);
            clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
          });
        } else {
          alert(`There are no possible answers for clue ${clue.id}`);
          // do something else useful here
        }
        break;
      case 12:
        possibleAnswers = AllAnswers.twelve;
        if (clue.answer.includes("") && clue.answer.join("").length !== 0) {
          regExp = arrayToRegularExp(clue.answer)!;
          possibleAnswers = possibleAnswers.filter((answer) => {
            if (answer.word) {
              return answer.word.match(regExp);
            } else {
              return answer.raw.match(regExp);
            }
          });
        }
        // at this point possibleAnswers is all words N letters long, a filtered array of words N letters long, or possibly empty
        if (possibleAnswers.length !== 0) {
          clue.answer = [
            ...(possibleAnswers[Math.floor(randVal * possibleAnswers.length)]
              .word !== undefined
              ? possibleAnswers[Math.floor(randVal * possibleAnswers.length)]
                  .word!
              : possibleAnswers[Math.floor(randVal * possibleAnswers.length)]
                  .raw),
          ];
          clue.intersection?.forEach((item) => {
            const clueToUpdate = clues.find((clue) => {
              return clue.id === item.id;
            })!;
            // console.log(clueToUpdate);
            clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
          });
        } else {
          alert(`There are no possible answers for clue ${clue.id}`);
          // do something else useful here
        }
        break;
      case 11:
        possibleAnswers = AllAnswers.eleven;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 10:
        possibleAnswers = AllAnswers.ten;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 9:
        possibleAnswers = AllAnswers.nine;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 8:
        possibleAnswers = AllAnswers.eight;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 7:
        possibleAnswers = AllAnswers.seven;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 6:
        possibleAnswers = AllAnswers.six;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 5:
        possibleAnswers = AllAnswers.five;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 4:
        possibleAnswers = AllAnswers.four;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      case 3:
        possibleAnswers = AllAnswers.three;
        setClueAnswers(clues, clue, possibleAnswers, regExp, randVal);
        break;
      default:
        break;
    }
  });
};

export const sortCluesDescendingLength = (clues: Clue[]) => {
  return clues.sort((a: Clue, b: Clue) => {
    return b.length - a.length;
  });
};

export const removeChars = (answers: Answer[]) => {
  for (const answer of answers) {
    if (answer.raw.includes("-") || answer.raw.includes("'")) {
      answer.word = answer.raw.replace(new RegExp(/[-']/, "g"), "");
      answer.length = answer.word.length;
    }
  }
  // console.log(answers);
};

export const separateByLength = (answers: Answer[], wordLength: number) => {
  const filteredAnswers = answers.filter((answer) => {
    return answer.length === wordLength;
  });
  return filteredAnswers;
};

export const getAcrossClues = (clues: Clue[]) => {
  return clues.filter((clue) => {
    return clue.direction === Direction.ACROSS;
  });
};

export const getDownClues = (clues: Clue[]) => {
  return clues.filter((clue) => {
    return clue.direction === Direction.DOWN;
  });
};

export const setCluesThatIntersect = (clue: Clue, clues: Clue[]) => {
  const { indices } = clue;
  const intersection = [];
  for (const clue of clues) {
    // iterate over every clue
    for (const index of indices) {
      // for each clue, iterate over the index
      if (clue.indices.includes(index)) {
        intersection.push({
          id: clue.id,
          myIndex: indices.indexOf(index),
          yourIndex: clue.indices.indexOf(index),
        });
      }
    }
  }
  clue.intersection = intersection;
};

export const arrayToRegularExp = (answer: string[]) => {
  if (!answer.includes("")) {
    return;
  }
  // construct a regular expression
  const regExp = answer.map((char) => {
    if (char === "") {
      return "[A-Z]";
    } else {
      return char;
    }
  });
  // console.log(array);
  return new RegExp(regExp.join(""));
};

const setClueAnswers = (
  clues: Clue[],
  clue: Clue,
  possibleAnswers: Answer[],
  regExp: RegExp,
  randVal: number
) => {
  // if an answer has some letters but is not complete, create a regexp, and get all words that match that pattern
  if (clue.answer.includes("") && clue.answer.join("").length !== 0) {
    regExp = arrayToRegularExp(clue.answer)!;
    possibleAnswers = possibleAnswers.filter((answer) => {
      if (answer.word) {
        return answer.word.match(regExp);
      } else {
        return answer.raw.match(regExp);
      }
    });
  }
  // at this point possibleAnswers is all words N letters long, a filtered array of words N letters long, or possibly empty
  if (possibleAnswers.length !== 0) {
    clue.answer = [
      ...(possibleAnswers[Math.floor(randVal * possibleAnswers.length)].word !==
      undefined
        ? possibleAnswers[Math.floor(randVal * possibleAnswers.length)].word!
        : possibleAnswers[Math.floor(randVal * possibleAnswers.length)].raw),
    ];
    clue.intersection?.forEach((item) => {
      const clueToUpdate = clues.find((clue) => {
        return clue.id === item.id;
      })!;

      clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
    });
  } else {
    alert(`There are no possible answers for clue ${clue.id}`);
    // do something else useful here
  }
};
