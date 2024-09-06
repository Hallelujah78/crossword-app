// models
import type { Storage } from "../models/LocalStorage.model";
import type { CellType } from "../models/Cell.model";
import Clue from "../classes/Clue";
import { Direction } from "../models/Direction.model";
import type Answer from "../models/Answer.model";
import type { Puzzles } from "../models/Puzzles.model";

// state
import * as AllAnswers from "../state/answers2";
import type { AllAnswersType } from "../state/answers2";
import backgroundColors from "../state/backgroundColors";

import { gridSideLength } from "../state/grid";
import type { Intersection } from "../models/Intersection.model";

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
    item.clueNumber = "";
    if (
      ((!item.top && !item.left) ||
        (item.top && !item.left && item.right) ||
        (!item.top && item.bottom)) &&
      !item.isVoid
    ) {
      item.clueNumber = (currentClueNum + 1).toString();
      currentClueNum++;
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
    item.answer = "";
    item.letter = "";
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
  return newGrid;
};

export const createClues = (grid: CellType[]) => {
  const clues: Clue[] = [];
  const clueIndices = getClueIndices(grid);

  for (const currIndex of clueIndices) {
    // across clue
    if (grid[currIndex].right && !grid[currIndex].left) {
      const acrossClue = new Clue(
        0,
        `${currIndex}ACROSS`,
        1,
        Direction.ACROSS,
        [currIndex],
        [""],
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
        0,
        `${currIndex}DOWN`,
        1,
        Direction.DOWN,
        [currIndex],
        [""],
        [""],
        ""
      );

      let isCell = true;
      let startIndex = currIndex;
      while (isCell) {
        if (grid[startIndex].bottom) {
          downClue.length = downClue.length + 1;
          const cellBelow = getCellBelow(grid, startIndex);
          if (cellBelow) {
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
  }

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
  cluesState: Clue[],
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
  },
  grid: CellType[],
  removeEmpty: boolean
) => {
  // copy the React state values

  const newState = {
    clues: JSON.parse(JSON.stringify(cluesState)) as Clue[],
    grid: JSON.parse(JSON.stringify(grid)) as CellType[],
  };

  for (const clue of newState.clues) {
    // let answer: string;
    let possibleAnswers: Answer[] = [];
    const randVal = Math.random();

    switch (clue.length) {
      case 13:
        possibleAnswers = AllAnswers.thirteen;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 12:
        possibleAnswers = AllAnswers.twelve;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 11:
        possibleAnswers = AllAnswers.eleven;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 10:
        possibleAnswers = AllAnswers.ten;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 9:
        possibleAnswers = AllAnswers.nine;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 8:
        possibleAnswers = AllAnswers.eight;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 7:
        possibleAnswers = AllAnswers.seven;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 6:
        possibleAnswers = AllAnswers.six;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 5:
        possibleAnswers = AllAnswers.five;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 4:
        possibleAnswers = AllAnswers.four;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      case 3:
        possibleAnswers = AllAnswers.three;
        setClueAnswers(
          newState.clues,
          clue,
          possibleAnswers,
          randVal,
          newState.grid
        );
        break;
      default:
        break;
    }
  }

  const emptyCells = newState.grid.filter((cell) => {
    if (cell.isVoid !== true) {
      return cell.letter === undefined || cell.letter === "";
    }
  });
  // gridState
  if (removeEmpty) {
    for (const cell of emptyCells) {
      cell.isVoid = true;
      removeClue(newState.clues, cell.id);
      updateSurroundingCells(newState.grid, cell.id);
      newState.grid[newState.grid.length - 1 - cell.id].isVoid = true;
      newState.grid[newState.grid.length - 1 - cell.id].letter = "";
      removeClue(newState.clues, newState.grid.length - 1 - cell.id);
      updateSurroundingCells(newState.grid, newState.grid.length - 1 - cell.id);
    }
    let valid = validateGrid(newState.clues, newState.grid);
    if (!valid) {
      resetIslandCell(newState.grid);
      valid = validateGrid(newState.clues, newState.grid);
    }
  } else if (emptyCells) {
    const updatedState = fillEmptyAnswers(newState.clues, newState.grid);
    if (updatedState?.clues) {
      newState.clues = updatedState.clues;
    }
    if (updatedState?.grid) {
      newState.grid = updatedState.grid;
    }
  }
  setClueNumbersOnClues(newState.clues, newState.grid);
  setClueNumbers(newState.grid);
  // return clueList and gridState
  // setClueList(clues);
  // setGridState(gridState);
  return newState;
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

export const setCluesThatIntersect = (currClue: Clue, clues: Clue[]) => {
  const { indices } = currClue;
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
  currClue.intersection = intersection;
};

export const arrayToRegularExp = (answer: string[]) => {
  if (!answer.includes("")) {
    return;
  }
  // construct a regular expression
  const regExp = answer.map((char) => {
    if (char === "") {
      return "[A-Z]";
    }
    return char;
  });
  return new RegExp(regExp.join(""));
};

const setClueAnswers = (
  clues: Clue[],
  clue: Clue,
  possibleAnswers: Answer[],
  randVal: number,
  gridState: CellType[]
) => {
  // if an answer has some letters but is not complete, create a regexp, and get all words that match that pattern
  let regExp: RegExp;
  let candidateAnswers = possibleAnswers;

  if (clue.answer.includes("") && clue.answer.join("").length !== 0) {
    regExp = arrayToRegularExp(clue.answer) as RegExp;

    candidateAnswers = getMatches(
      possibleAnswers,
      regExp,
      clue.answer.join(""),
      clues
    );
  }

  // at this point possibleAnswers is all words N letters long, a filtered array of words N letters long, or possibly empty
  if (candidateAnswers.length !== 0) {
    const clueAnswer =
      candidateAnswers[Math.floor(randVal * candidateAnswers.length)];

    clue.answer = [
      ...(clueAnswer.word !== undefined && clueAnswer.word !== null
        ? clueAnswer.word
        : clueAnswer.raw),
    ];
    clue.raw = [...clueAnswer.raw];

    if (clue.intersection) {
      for (const item of clue.intersection) {
        const clueToUpdate = clues.find((clue) => clue.id === item.id);
        if (clueToUpdate) {
          clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
        }
      }
    }

    for (let i = 0; i < clue.length; i++) {
      gridState[clue.indices[i]].letter = clue.answer[i];
    }
  } else {
    // from this point - we are dealing with substituting intersecting clues

    const letterIndex = [];
    const patterns = [];
    const tempAnswer = [...clue.answer];
    const cluesToSwap = []; // holds the id and yourIndex
    const replaceClues: (Clue | undefined)[] = [];

    // this for loop does two things
    // 1) it resets each element of tempAnswer to be an empty string
    // eg ['', '', '', '', '']
    // 2) it populates letterIndex with the index at which a letter occurred in tempAnswer before it is reset
    for (const letter of tempAnswer) {
      if (letter) {
        letterIndex.push(tempAnswer.indexOf(letter));
        tempAnswer[clue.answer.indexOf(letter)] = "";
      }
    }

    // this for loop does a number of things
    // its main purpose is to construct patterns which represent dropping a letter from an intersecting clue, but retaining letters from other intersecting clues
    // example: our clue answer is ['B', '', 'Z']
    // the B and the Z intersect with two other clues
    // our patterns will be: ['B', '', ''] and ['', '', 'Z']
    // these patterns end up in the patterns variable
    // the other thing it does is finds the clues that intersects with the current clue's index and pushes them to an array, cluesToSwap
    for (const index of letterIndex) {
      const tempAnswer = [...clue.answer];
      tempAnswer[index] = "";
      if (clue.intersection) {
        cluesToSwap.push(
          ...clue.intersection.filter((item) => {
            return item.myIndex === index;
          })
        );
      }

      patterns.push(tempAnswer);
    }

    // we iterate over cluesToSwap
    // for each Clue in cluesToSwap, (these are the clues that intersect with the current clue's index),
    // we look in the current clue's intersection prop and return the object in there that matches the ID of
    // our Clue. This object is of the form:
    // {id: '4DOWN', myIndex: 4, yourIndex: 2, letter: ''}
    // then we set the letter prop of our Clue to equal the letter that occurs in our current clue at the
    // myIndex prop of the intersection object with the matching ID (this is not good code)
    // lastly, for each intersection object, we take the id and find the Clue in clues that matches that ID
    // and push it into a replaceClues array.
    let intersectingClueIndex: number | undefined;
    for (const intersectClue of cluesToSwap) {
      const clueId = intersectClue.id;
      if (clue.intersection) {
        intersectingClueIndex = clue.intersection.find((item) => {
          return clueId === item.id;
        })?.myIndex;
      }
      if (intersectingClueIndex)
        intersectClue.letter = clue.answer[intersectingClueIndex];

      replaceClues.push(
        clues.find((item) => {
          return intersectClue.id === item.id;
        })
      );
    }

    // we need to remove letters from the intersecting clues
    // then we create a regex and match again

    // removing letters
    // intersection: we want myIndex

    // we need to create RegExps for the answer to each clue that intersects with our current clue, this will allow us to search for alternative answers to these clues
    // 1) we push the myIndex value to a myIndices array - for each Clue this represents the index within the Clue's answer that intersects with another clue
    // 2) we copy the answer for each Clue to a tempAnswer var
    // 3) we iterate over this tempAnswer and set non-shared values (positions in the answer that don't intersect with other clues) to an empty string
    // we convert the tempAnswer to a regular expression and push it to a replaceCluePattern array
    const replaceCluePattern: RegExp[] = [];

    for (const rClue of replaceClues) {
      const intersectingClues: Clue[] = [];
      const myIndices: number[] = [];
      let myTempAnswer: string[] = [];
      if (rClue?.intersection && rClue?.answer) {
        myTempAnswer = [...rClue.answer];

        for (const intersectObj of rClue.intersection) {
          myIndices.push(intersectObj.myIndex);
          const irClue = clues.find((item) => {
            return item.id === intersectObj.id;
          });
          if (irClue) intersectingClues.push(irClue);
        }
      }

      for (const item of intersectingClues) {
        let irClue: Intersection | undefined;

        if (item.answer.includes("")) {
          if (rClue?.intersection) {
            irClue = rClue?.intersection.find((intersectObj) => {
              return intersectObj.id === item.id;
            });
          }
        }
        if (irClue) {
          myTempAnswer[irClue.myIndex] = "";
        }
      }
      //---------------

      for (let i = 0; i < myTempAnswer.length; ++i) {
        if (!myIndices.includes(i)) {
          myTempAnswer[i] = "";
        }
      }
      // arrayToRegularExp returns undefined if myTempAnswer DOES NOT include empty strings
      // this implies that the answer is full
      // this also means that we are pushing undefined values to replaceCluePatterns
      const pattern = arrayToRegularExp(myTempAnswer);
      if (pattern) replaceCluePattern.push(pattern);
    }

    //------------------------------------------------

    for (const [index, rClue] of replaceClues.entries()) {
      const length = rClue?.length as AnswerLength;
      const wordList = getWordList(length, AllAnswers);

      let candidateAnswers = getMatches(
        wordList,
        replaceCluePattern[index],
        rClue.answer.join(""),
        clues
      );

      const sharedLetter = getLetter(rClue as Clue, clue);

      if (sharedLetter && sharedLetter.rClueIndex !== undefined) {
        candidateAnswers = candidateAnswers.filter((answer) => {
          if (answer.word) {
            return (
              answer.word.charAt(sharedLetter.rClueIndex as number) !==
              sharedLetter.letter
            );
          }
          return (
            answer.raw.charAt(sharedLetter.rClueIndex as number) !==
            sharedLetter.letter
          );
        });
      }

      const usedLetters = [sharedLetter?.letter];
      const uniqueAnswers = [];

      for (const answer of candidateAnswers) {
        let candidateAnswer: string;
        if (answer.word) {
          candidateAnswer = answer.word;
        } else candidateAnswer = answer.raw;

        if (
          sharedLetter &&
          sharedLetter.rClueIndex !== undefined &&
          !usedLetters.includes(
            candidateAnswer[sharedLetter.rClueIndex as number]
          )
        ) {
          usedLetters.push(candidateAnswer[sharedLetter.rClueIndex as number]);
          uniqueAnswers.push(answer); // *******
        }
      }
      // we need to break out of this once we set clue answer, rclue answer and update the intersecting clues
      for (const answer of uniqueAnswers) {
        const word = answer.word ? answer.word : answer.raw;
        let candidateAnswer: string[] = [];

        let regExp: RegExp | undefined;

        if (
          sharedLetter &&
          sharedLetter.clueIndex !== undefined &&
          sharedLetter.rClueIndex !== undefined
        ) {
          candidateAnswer = [...clue.answer];
          candidateAnswer[sharedLetter.clueIndex] =
            word[sharedLetter.rClueIndex];
          regExp = arrayToRegularExp(candidateAnswer);
        }

        const wordList = getWordList(
          clue.answer.length as AnswerLength,
          AllAnswers
        );

        const candidateAnswers = getMatches(
          wordList,
          regExp,
          candidateAnswer.join(""),
          clues
        );

        if (candidateAnswers.length > 0) {
          if (candidateAnswers[0].word) {
            clue.answer = [...candidateAnswers[0].word];
          } else {
            clue.answer = [...candidateAnswers[0].raw];
          }
          clue.raw = [...candidateAnswers[0].raw];

          if (rClue) {
            // if word exists on answer, then word refers to the word prop (including hyphens etc), else it refers to raw
            rClue.answer = [...word];

            rClue.raw = [...answer.raw];
          }

          // ****************** update intersecting clues below this
          clue.intersection?.forEach((item) => {
            item.letter = clue.answer[item.myIndex];
            const clueToUpdate = clues.find((clue) => {
              return clue.id === item.id;
            });

            clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
          });
          // ****************** update intersecting clues above this
          // updating rclue intersection?
          if (rClue) {
            rClue.intersection?.forEach((item) => {
              item.letter = rClue.answer[item.myIndex];
              const clueToUpdate = clues.find((clue) => {
                return clue.id === item.id;
              });
              clueToUpdate.answer[item.yourIndex] = rClue.answer[item.myIndex];
            });
          }

          // update the grid state with the letters
          for (let i = 0; i < clue.length; i++) {
            gridState[clue.indices[i]].letter = clue.answer[i];
          }
          if (rClue) {
            for (let i = 0; i < rClue.length; i++) {
              gridState[rClue.indices[i]].letter = rClue.answer[i];
            }
          }
        } else {
        }
        // we need an else here if there are no candidate answers
      }
    }
  }
};
// end of setClueAnswers

const AnswerMapping = {
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
} as const;

export type AnswerLength = keyof typeof AnswerMapping;
export type AllAnswerKey = keyof typeof AllAnswers;

export const getWordList: (
  answerLength: AnswerLength,
  AllAnswers: AllAnswersType
) => Answer[] = (answerLength, AllAnswers) => {
  const allAnswerKey: AllAnswerKey = AnswerMapping[answerLength];
  return AllAnswers[allAnswerKey];
};

// getMatches exludes the current answer
export const getMatches = (
  possibleAnswers: Answer[],
  regExp: RegExp | undefined,
  currentAnswer: string,
  clues: Clue[]
) => {
  if (!regExp) {
    return [];
  }
  const currentAnswers: string[] = [];

  for (const clue of clues) {
    const currentAnswer = clue.answer;
    if (!currentAnswer.includes("")) {
      currentAnswers.push(currentAnswer.join(""));
    }
  }

  const candidateAnswers = possibleAnswers.filter((answer) => {
    if (
      answer.word !== undefined &&
      answer.word !== currentAnswer &&
      !currentAnswers.includes(answer.word)
    ) {
      return answer.word.match(regExp);
    } else if (
      answer.raw !== currentAnswer &&
      !currentAnswers.includes(answer.raw)
    ) {
      return answer.raw.match(regExp);
    }
  });
  return candidateAnswers;
};

export const getAllMatches = (
  possibleAnswers: Answer[],
  regExp: RegExp | undefined,
  currentAnswer: string,
  clues: Clue[]
) => {
  if (!regExp) {
    return [];
  }
  const currentAnswers: string[] = [];

  for (const clue of clues) {
    const clueAnswer = clue.answer;
    if (!clueAnswer.includes("") && clueAnswer.join("") !== currentAnswer) {
      currentAnswers.push(clueAnswer.join(""));
    }
  }

  const candidateAnswers = possibleAnswers.filter((answer) => {
    if (answer.word !== undefined && !currentAnswers.includes(answer.word)) {
      return answer.word.match(regExp);
    } else if (!currentAnswers.includes(answer.raw)) {
      return answer.raw.match(regExp);
    }
  });
  return candidateAnswers;
};

// ** testing only

// const logIntersectClueAnswers = (
//   intersection:
//     | {
//         id: string;
//         myIndex: number;
//         yourIndex: number;
//         letter?: string | undefined;
//       }[]
//     | undefined,
//   clues: Clue[]
// ) => {
//   const intersectClues: Clue[] = [];
//   intersection!.forEach((item) => {
//     clues.find((intersectingClue) => {
//       if (item.id === intersectingClue.id) {
//         intersectClues.push(intersectingClue);
//       }
//     });
//   });
// };

export interface SharedLetter {
  rClueIndex: number | undefined;
  clueIndex: number | undefined;
  letter: string | undefined;
}

export const getLetter = (rClue: Clue, currentClue: Clue) => {
  const sharedLetter: SharedLetter = {
    rClueIndex: undefined,
    letter: undefined,
    clueIndex: undefined,
  };
  let intersection: Intersection | undefined;
  if (rClue.intersection) {
    intersection = rClue.intersection.find((item) => {
      return item.id === currentClue.id;
    });
  }
  if (intersection) {
    sharedLetter.rClueIndex = intersection.myIndex;
    sharedLetter.clueIndex = intersection.yourIndex;
  }

  if (sharedLetter.rClueIndex !== undefined) {
    sharedLetter.letter = rClue.answer[sharedLetter.rClueIndex];
  }

  if (sharedLetter.letter !== undefined) {
    return sharedLetter;
  }
};

export const initializeApp = (grid: CellType[]) => {
  const tempGrid = JSON.parse(JSON.stringify(grid)) as CellType[];

  const clues = createClues(tempGrid);

  const acrossClues = getAcrossClues(clues);
  const downClues = getDownClues(clues);
  for (const clue of clues) {
    if (clue.direction === Direction.DOWN) {
      setCluesThatIntersect(clue, acrossClues);
    } else setCluesThatIntersect(clue, downClues);
  }
  sortCluesDescendingLength(clues);

  return clues;
};

const removeClue = (clues: Clue[], index: number): Clue[] => {
  const cluesToRemove = clues.filter((clue) => {
    return clue.indices.includes(index);
  });
  if (!cluesToRemove || cluesToRemove.length === 0) {
    return clues;
  }

  const indicesToRemove: number[] = [];
  if (cluesToRemove !== undefined) {
    for (const clueToRemove of cluesToRemove) {
      const removeId = clueToRemove.id;
      indicesToRemove.push(clues.indexOf(clueToRemove));

      for (const intersectObj of clueToRemove.intersection) {
        let index;
        // get the intersectingClue
        // get the index in the intersectingClue.intersection of: item.id === removeId
        const intersectingClue = clues.find((clueItem) => {
          return clueItem.id === intersectObj.id;
        });
        index = intersectingClue?.intersection.findIndex((intersectingItem) => {
          return intersectingItem.id === removeId;
        });
        if (index !== undefined) {
          intersectingClue?.intersection?.splice(index, 1);
        }
      }
    }
  }
  if (indicesToRemove.length > 0) {
    for (const index of indicesToRemove) {
      clues.splice(index, 1);
    }
  }
  return clues;
};

export const getIntersectingClues = (clue: Clue, clues: Clue[]) => {
  const intersection = clue?.intersection;
  const intersectingClues: Clue[] = [];
  if (intersection) {
    for (const intersectObject of intersection) {
      const intersectingClue = clues.find((clue) => {
        return clue.id === intersectObject.id;
      });
      if (intersectingClue) {
        intersectingClues.push(intersectingClue);
      }
    }
  }
  return intersectingClues;
};

export const getIncompleteAnswers = (clues: Clue[]) => {
  const incomplete = clues.filter((clue) => {
    return clue.answer.includes("");
  });
  return incomplete;
};

export const resetIntersectClue = (iClue: Clue, currClueId: string) => {
  const tempAnswer = [...iClue.answer];

  const sharedIndices: number[] = [];
  iClue.intersection?.forEach((item) => {
    if (item.id !== currClueId) {
      sharedIndices.push(item.myIndex);
    }
  });

  for (const [index, _letter] of iClue.answer.entries()) {
    if (!sharedIndices.includes(index)) {
      tempAnswer[index] = "";
    }
  }
  return tempAnswer;
};

export const createUniqueLetterList = (
  sharedLetter: SharedLetter,
  matches: Answer[]
) => {
  if (
    sharedLetter.clueIndex === undefined ||
    sharedLetter.rClueIndex === undefined
  ) {
    throw new Error(
      "error in createUniqueLetterList: a property of sharedLetter is undefined"
    );
  }
  const uniqueLetters: { index: number; letters: string[] } = {
    index: sharedLetter.clueIndex,
    letters: [],
  };

  for (const match of matches) {
    const word = match.word ? match.word : match.raw;
    if (
      !uniqueLetters.letters.includes(word[sharedLetter.rClueIndex as number])
    ) {
      uniqueLetters.letters.push(word[sharedLetter.rClueIndex as number]);
    }
  }
  return uniqueLetters;
};

export function generateCombinations(
  options: { index: number | undefined; letters: string[] }[],
  currentIndex = 0,
  currentCombination: string[] = []
): string[][] {
  // Base case: if we have reached the last index, add the current combination to the result
  if (currentIndex === options.length) {
    return [currentCombination];
  }

  const currentOptions = options[currentIndex].letters;
  const combinations = [];

  // Iterate over each option for the current index
  for (const option of currentOptions) {
    // Create a copy of the current combination
    const newCombination: string[] = [...currentCombination];
    // Set the current option at the current index
    newCombination[currentIndex] = option;
    // Recursively generate combinations for the next index
    const nextCombinations = generateCombinations(
      options,
      currentIndex + 1,
      newCombination
    );
    // Add the combinations generated for the next index to the result
    combinations.push(...nextCombinations);
  }
  return combinations;
}

export const setClueAnswer = (candidateAnswers: Answer[], clue: Clue) => {
  if (candidateAnswers.length > 0) {
    if (candidateAnswers[0].word) {
      clue.answer = [...candidateAnswers[0].word];
    } else {
      clue.answer = [...candidateAnswers[0].raw];
    }
    clue.raw = [...candidateAnswers[0].raw];
  }
};

export const updateIntersectingClues = (clue: Clue, clues: Clue[]) => {
  // we'll return clues that have been updated, maybe
  const cluesToUpdate: Clue[] = [];
  clue.intersection?.forEach((item) => {
    item.letter = clue.answer[item.myIndex];
    const clueToUpdate = clues.find((clue) => {
      return clue.id === item.id;
    });
    const oldLetter = clueToUpdate.answer[item.yourIndex];
    const newLetter = clue.answer[item.myIndex];
    clueToUpdate.answer[item.yourIndex] = newLetter;

    // if the shared letter has updated, then we need to replace the answer for the updated clue
    if (oldLetter !== newLetter) {
      // we don't need the index? just reset all unshared letters, pattern, match and set
      cluesToUpdate.push(clueToUpdate);
    }
  });
  return cluesToUpdate;
};

// reset a clue's non-intersecting letters to empty strings
export const resetClue = (clue: Clue) => {
  const tempAnswer = [...clue.answer];
  const sharedIndices: number[] = [];

  clue.intersection?.forEach((item) => {
    sharedIndices.push(item.myIndex);
  });

  for (const [index, _letter] of clue.answer.entries()) {
    if (!sharedIndices.includes(index)) {
      tempAnswer[index] = "";
    }
  }
  return tempAnswer;
};

// update the grid state with the clue answer we just set
export const updateGridState = (clue: Clue, gridState: CellType[]) => {
  for (let i = 0; i < clue.length; i++) {
    gridState[clue.indices[i]].letter = clue.answer[i];
  }
};

// retains the grid structure but resets letters and clue answers
export const resetAllAnswers = (clueList: Clue[], gridState: CellType[]) => {
  const clues = [...clueList];
  const grid = [...gridState];

  for (const clue of clues) {
    // reset the answer and intersection
    const emptyAnswer = new Array(clue.answer.length).fill("");
    clue.answer = emptyAnswer;
    clue.raw = [""];

    if (clue.intersection) {
      for (const intersectObj of clue.intersection) {
        if (intersectObj.letter) {
          delete intersectObj.letter;
        }
      }
    }
  }
  for (const cell of grid) {
    cell.answer = "";
    cell.selected = false;
    if (cell.letter) {
      cell.letter = ""; // this was deleting cell.letter
    }
  }
  return { grid, clues };
};

export const fillEmptyAnswers = (clueList: Clue[], gridState: CellType[]) => {
  const clueListCopy = [...clueList];
  const gridStateCopy = [...gridState];
  const incompletes = getIncompleteAnswers(clueListCopy);

  // start of incompletes iteration
  for (const incomplete of incompletes) {
    const allUniqueLetters = [];

    const intersecting = getIntersectingClues(incomplete, clueListCopy);

    for (const clue of intersecting) {
      const resetAnswer = resetIntersectClue(clue, incomplete.id);
      const pattern = arrayToRegularExp(resetAnswer);
      const wordList = getWordList(
        resetAnswer.length as AnswerLength,
        AllAnswers
      );
      const matches = getAllMatches(
        wordList,
        pattern,
        clue.answer.join(""),
        clueListCopy
      );
      const sharedLetter = getLetter(clue, incomplete);
      const uniqueLetters = createUniqueLetterList(
        sharedLetter as SharedLetter,
        matches
      );
      allUniqueLetters.push(uniqueLetters);
    }
    if (allUniqueLetters.length > 1) {
      allUniqueLetters.sort((a, b) => {
        return a?.index - b?.index;
      });
    }
    const allCombos = generateCombinations(allUniqueLetters);
    // at this point we've generated all letter combinations that might be used to find an answer for the incomplete clue

    // create the patterns
    const patterns: RegExp[] = [];
    for (const combo of allCombos) {
      const patternHolder = new Array(incomplete.answer.length).fill("");

      const indices = Array.from(
        allUniqueLetters,
        (unique) => unique.index as number
      );

      // now iterate over each item in combo, and chuck it into patternHolder at the position?
      for (const [index, letter] of combo.entries()) {
        patternHolder[indices[index]] = letter;
      }
      // at this point patternHolder can be converted to a regexp and pushed to an array of patterns for matching
      patterns.push(arrayToRegularExp(patternHolder) as RegExp);
    }
    const wordList = getWordList(incomplete.length as AnswerLength, AllAnswers);

    for (const pattern of patterns) {
      let finishLoop = false;
      // once we set a clue answer and update the intersecting clues, we need to berak out of this loop
      const matchingWords = getAllMatches(
        wordList,
        pattern,
        incomplete.answer.join(""),
        clueListCopy
      );
      if (matchingWords.length > 0) {
        finishLoop = true;
        // set the answer and break
        setClueAnswer(matchingWords, incomplete);
        updateGridState(incomplete, gridStateCopy);

        // update intersecting clues
        const cluesToUpdate = updateIntersectingClues(incomplete, clueListCopy);
        // we will have to replace intersecting clue answers where the intersecting letter has been updated
        for (const clue of cluesToUpdate) {
          const resetAnswer = resetClue(clue);
          const pattern = arrayToRegularExp(resetAnswer);
          const wordList = getWordList(clue.length as AnswerLength, AllAnswers);
          const matches = getMatches(
            wordList,
            pattern,
            clue.answer.join(""),
            clueListCopy
          );
          if (matches.length > 0) {
            // set the answer and break
            setClueAnswer(matches, clue);
            updateGridState(clue, gridStateCopy);
          } else {
          }
        }
        // update the clueList React state
        // setClueList(clueListCopy);
        // setGridState(gridStateCopy);
        return { clues: clueListCopy, grid: gridStateCopy };
        // update the grid state
      } else {
      }
      if (finishLoop) {
        break;
      }
    }
  }
};

export const resetSelectedCells = (grid: CellType[]) => {
  for (const gridItem of grid) {
    gridItem.selected = false;
  }
};

export const setSelection = (grid: CellType[], clue: Clue) => {
  for (const index of clue.indices) {
    const gridItem = grid.find((gridItem) => {
      return gridItem.id === index;
    });
    if (gridItem) gridItem.selected = true;
  }
};

export const setClueNumbersOnClues = (
  clueList: Clue[],
  gridState: CellType[]
) => {
  for (const clue of clueList) {
    const indexOfStartAnswer = clue.indices[0];
    if (gridState[indexOfStartAnswer].clueNumber) {
    }
    clue.clueNumber = +gridState[indexOfStartAnswer].clueNumber;
  }
};

export const getWordLength = (clue: Clue) => {
  const { answer, raw } = clue;

  if (raw.length === answer.length) {
    return `(${raw.length})`;
  }
  // strip apostrophes
  let strippedWord: string[] = raw;
  if (raw.includes("'")) {
    strippedWord = raw.filter((character) => {
      return character !== "'";
    });
  }

  const wordLengths = [];
  let position = 0;
  let length = 1;
  while (position <= strippedWord.length) {
    position = position + 1;
    const char = strippedWord[position];

    if (char === " " || char === "-") {
      wordLengths.push(length);
      char === "-"
        ? wordLengths.push(strippedWord[position])
        : wordLengths.push(",");
      length = 0;
      continue;
    }
    if (position === strippedWord.length) {
      wordLengths.push(length);
    }
    length = length + 1;
  }
  return `(${wordLengths.join("")})`;
};

export const getCluesFromCell = (cell: CellType, clues: Clue[]) => {
  const cellId = cell.id; // index of the cell
  const containingClues = clues.filter((clue) => {
    return clue.indices.includes(cellId);
  });
  return containingClues;
};

export const setLocalStorage = (
  key: "solver" | "editor" | "puzzles",
  data: Storage
) => {
  const {
    grid,
    clues,
    clueSelection,
    cellSelection,
    isModified,
    puzzles,
    warn,
  } = data;
  let dataStore: Puzzles | Storage | null = null;
  if (key === "solver") {
    dataStore = {
      grid,
      clues,
      clueSelection: clueSelection ? clueSelection : "",
      cellSelection: cellSelection ? cellSelection : undefined,
    };
  } else if (key === "editor") {
    dataStore = {
      grid: grid,
      clues: clues,
      isModified: isModified,
      warn: warn,
    };
  } else {
    if (puzzles && puzzles.length > 0) {
      dataStore = puzzles;
    }
  }
  localStorage.setItem(key, JSON.stringify(dataStore));
};

export const getLocalStorage = (
  key: "solver" | "editor" | "puzzles"
): Storage | null => {
  let val = null;
  if (key === "solver" || key === "editor" || key === "puzzles") {
    val = JSON.parse(localStorage.getItem(key) as string) as Storage;
  }
  return val;
};

export const getRowOrColumn = (
  index: number,
  direction: Direction.ACROSS | Direction.DOWN,
  grid: CellType[]
): CellType[] => {
  const arrayOfCells: CellType[] = [];
  let currCellIndex = index;
  const squareRootGridLength = Math.sqrt(grid.length);
  if (direction === Direction.DOWN) {
    // get the column of cells
    while (!isTopEdge(grid, currCellIndex + squareRootGridLength)) {
      arrayOfCells.push(grid[currCellIndex]);
      currCellIndex = currCellIndex - squareRootGridLength;
    }
    currCellIndex = index + squareRootGridLength;
    while (!isBottomEdge(grid, currCellIndex - squareRootGridLength)) {
      arrayOfCells.push(grid[currCellIndex]);
      currCellIndex = currCellIndex + squareRootGridLength;
    }
    return arrayOfCells;
  }
  // get the row of cells
  // start and end vars
  currCellIndex = index;
  while (!isLeftEdge(grid, currCellIndex + 1)) {
    arrayOfCells.push(grid[currCellIndex]);
    --currCellIndex;
  }
  currCellIndex = index + 1;
  while (!isRightEdge(grid, currCellIndex - 1)) {
    arrayOfCells.push(grid[currCellIndex]);
    ++currCellIndex;
  }
  // 0 - 12 - 13;
  // 13 - 25 - 13;
  return arrayOfCells;
};

export const getCellUpRight = (index: number, grid: CellType[]) => {
  // there is no up-right for a cell that is on the right side of the grid or on the top of the grid
  let cell: CellType | undefined = undefined;
  if (!isTopEdge(grid, index) && !isRightEdge(grid, index)) {
    cell = grid[index - gridSideLength + 1];
  }
  return cell;
};

export const getCellDownRight = (index: number, grid: CellType[]) => {
  let cell: CellType | undefined = undefined;
  if (!isBottomEdge(grid, index) && !isRightEdge(grid, index)) {
    cell = grid[index + Math.sqrt(grid.length) + 1];
  }
  return cell;
};

export const getCellDownLeft = (index: number, grid: CellType[]) => {
  let cell: CellType | undefined = undefined;
  if (!isBottomEdge(grid, index) && !isLeftEdge(grid, index)) {
    cell = grid[index + gridSideLength - 1];
  }
  return cell;
};

export const getCellUpLeft = (index: number, grid: CellType[]) => {
  let cell: CellType | undefined = undefined;
  if (!isTopEdge(grid, index) && !isLeftEdge(grid, index)) {
    cell = grid[index - gridSideLength - 1];
  }
  return cell;
};

export const getContiguousVoids = (grid: CellType[], index: number) => {
  // index will be the index of a cell where isVoid is true
  const cell = grid[index];
  const voids: number[] = [index];
  // cell left
  if (cell.left === false && !isLeftEdge(grid, index)) {
    voids.push(index - 1);
  }
  // cell up
  if (cell.top === false && !isTopEdge(grid, index)) {
    voids.push(index - gridSideLength);
  }
  // cell right
  if (cell.right === false && !isRightEdge(grid, index)) {
    voids.push(index + 1);
  }
  // cell down
  if (cell.bottom === false && !isBottomEdge(grid, index)) {
    voids.push(index + gridSideLength);
  }
  // upleft
  getCellUpLeft(index, grid)?.isVoid && voids.push(index - gridSideLength - 1);
  // upright
  getCellUpRight(index, grid)?.isVoid && voids.push(index - gridSideLength + 1);
  // downright
  getCellDownRight(index, grid)?.isVoid &&
    voids.push(index + gridSideLength + 1);
  // downleft
  getCellDownLeft(index, grid)?.isVoid &&
    voids.push(index + gridSideLength - 1);
  return voids;
};

export const getAllEdgeCells = (grid: CellType[]) => {
  let allEdge = [];
  allEdge.push(findBottomEdge(grid));
  allEdge.push(findLeftEdge(grid));
  allEdge.push(findRightEdge(grid));
  allEdge.push(findTopEdge(grid));
  allEdge = allEdge.flat();
  allEdge = Array.from(new Set(allEdge));
  return allEdge;
};

export const isSubset = (arr1: number[], arr2: number[]) => {
  let mySet: Set<number> | number[];
  let myArray = arr1;

  if (arr1.length >= arr2.length) {
    mySet = new Set(arr1);
    myArray = arr2;
  } else {
    mySet = new Set(arr2);
  }

  for (const num of myArray) {
    if (!mySet.has(num)) {
      return false;
    }
  }
  return true;
};

export const getContiguousLights = (grid: CellType[], index: number) => {
  // index will be the index of a cell where isVoid is false

  const cell = grid[index];
  const lightCells: number[] = [index];
  // cell left
  if (cell.left === false && !isLeftEdge(grid, index)) {
    lightCells.push(index - 1);
  }
  // cell up
  if (cell.top === false && !isTopEdge(grid, index)) {
    lightCells.push(index - gridSideLength);
  }
  // cell right
  if (cell.right === false && !isRightEdge(grid, index)) {
    lightCells.push(index + 1);
  }
  // cell down
  if (cell.bottom === false && !isBottomEdge(grid, index)) {
    lightCells.push(index + gridSideLength);
  }

  return lightCells;
};

export function mergeSubarrays(arrays: number[][]) {
  function mergeTwoArrays(arr1: number[], arr2: number[]) {
    return [...new Set([...arr1, ...arr2])];
  }

  function hasCommonElements(arr1: number[], arr2: number[]) {
    return arr1.some((item) => arr2.includes(item));
  }

  // This array will store the result
  const result = [];

  while (arrays.length > 0) {
    let first = arrays[0];
    let rest = arrays.slice(1); //copies array from pos 1 inclusive

    // on iteration 2
    // - arrays contains the arrays that had no intersection with the initial value of first
    // - first is the first element of this new arrays
    // - rest is the rest of the values of this new arrays
    // - on the first iteration, we take the first element of arrays and compare it to all the others
    // - we update arrays that couldn't be merged
    // - we then compare the first element of this new array with the rest, and so on
    // what happens

    let lf = -1; // lf is not equal to first.length, so enter while
    while (lf !== first.length) {
      lf = first.length; // this means this inner while loop runs the for loop once and then exits
      const rest2 = [];
      for (const arr of rest) {
        if (hasCommonElements(first, arr)) {
          // we set first to be the merging of first and arr
          // lf !== first.length, and so the while only gets executed once
          first = mergeTwoArrays(first, arr);
        } else {
          rest2.push(arr); // if no common elements between first and arr of rest, store it in rest2
        }
      }
      rest = rest2; // rest now contains the original values of rest that didn't match first
    }

    result.push(first); // all of the merged arrays so far
    arrays = rest; // rest and array now contains only unmerged arrays
  }

  return result;
}

// if all cells on an edge are void, set grid prop to invalid for each cell
export const setAllVoidEdgeInvalid = (grid: CellType[]) => {
  const allEdge = [];
  allEdge.push(findBottomEdge(grid));
  allEdge.push(findLeftEdge(grid));
  allEdge.push(findRightEdge(grid));
  allEdge.push(findTopEdge(grid));

  for (const edge of allEdge) {
    //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const nonVoid = edge.filter((index: number) => {
      return !grid[index].isVoid;
    });
    if (nonVoid.length === 0) {
      for (const index of edge) {
        grid[index].isValid = false;
      }
    }
  }
};

export const isGridValid = (grid: CellType[]) => {
  let isValid = true;
  for (const cell of grid) {
    if (cell.backgroundColor || !cell.isValid) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

export const isLetter = (letter: string) => {
  return (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".includes(letter) &&
    letter.length === 1
  );
};

export const validateGrid = (clues: Clue[], grid: CellType[]) => {
  // setIsValid(true);
  let valid = true;
  // reset isValid to true and backgroundColor to ""
  for (const cell of grid) {
    cell.isValid = true;
    cell.backgroundColor = "";
  }

  const shortAnswers = clues.filter((clue) => clue.length < 3);
  const islandCell = grid.filter(
    (cell) =>
      !cell.isVoid && !cell.bottom && !cell.top && !cell.right && !cell.left
  );

  // short answers
  for (const clue of shortAnswers) {
    for (const index of clue.indices) {
      grid[index].isValid = false;
    }
  }

  // island cell - a type of short answer
  for (const cell of islandCell) {
    grid[cell.id].isValid = false;
  }

  // entire side is voids
  setAllVoidEdgeInvalid(grid);

  // are all light cells connected?
  const allLights = [];
  for (const clue of clues) {
    allLights.push(clue.indices);
  }
  const mergedLights = mergeSubarrays(allLights);

  if (mergedLights.length > 1) {
    for (const [index, lights] of mergedLights.entries()) {
      for (const num of lights) {
        grid[num].backgroundColor = backgroundColors[index];
      }
    }
  }

  for (const cell of grid) {
    if (cell.backgroundColor || !cell.isValid) {
      // setIsValid(false);
      valid = false;
      break;
    }
  }
  return valid;
};

export const resetIslandCell = (grid: CellType[]) => {
  // update grid in place
  // do we really want to deep copy grid in every function?
  const islandCell = grid.filter(
    (cell) =>
      !cell.isVoid && !cell.bottom && !cell.top && !cell.right && !cell.left
  );
  for (const cell of islandCell) {
    grid[cell.id].isVoid = true;
    grid[cell.id].letter = "";
    grid[cell.id].clueNumber = "";
    grid[cell.id].answer = "";
    updateSurroundingCells(grid, grid.length - 1 - cell.id);
  }
};
