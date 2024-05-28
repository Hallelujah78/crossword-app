// models
import { CellType } from "../models/Cell.model";
import Clue from "../classes/Clue";
import { Direction } from "../models/Direction.model";
import Answer from "../models/Answer.model";
import * as AllAnswers from "../data/answers2";
import { Dispatch, SetStateAction } from "react";

type AllAnswers = {
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
};

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

  clueIndices.forEach((currIndex) => {
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
  setGridState: Dispatch<SetStateAction<CellType[]>>,
  setClueList: Dispatch<SetStateAction<Clue[]>>,
  removeEmpty: boolean
) => {
  // copy the React state values
  let clues = [...cluesState];
  let gridState = [...grid];

  for (const clue of clues) {
    // let answer: string;
    let possibleAnswers: Answer[] = [];
    const randVal = Math.random();

    switch (clue.length) {
      case 13:
        possibleAnswers = AllAnswers.thirteen;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 12:
        possibleAnswers = AllAnswers.twelve;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 11:
        possibleAnswers = AllAnswers.eleven;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 10:
        possibleAnswers = AllAnswers.ten;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 9:
        possibleAnswers = AllAnswers.nine;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 8:
        possibleAnswers = AllAnswers.eight;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 7:
        possibleAnswers = AllAnswers.seven;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 6:
        possibleAnswers = AllAnswers.six;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 5:
        possibleAnswers = AllAnswers.five;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 4:
        possibleAnswers = AllAnswers.four;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      case 3:
        possibleAnswers = AllAnswers.three;
        setClueAnswers(clues, clue, possibleAnswers, randVal, gridState);
        break;
      default:
        break;
    }
  }

  const emptyCells = gridState.filter((cell) => {
    if (cell.isVoid !== true) {
      return cell.letter === undefined || cell.letter === "";
    }
  });
  // gridState
  if (removeEmpty) {
    emptyCells.forEach((cell) => {
      cell.isVoid = true;
      removeClue(clues, cell.id!);
      console.log(`**setting ${cell.id} to void**`);
      updateSurroundingCells(gridState, cell.id!);
      gridState[gridState.length - 1 - cell.id!].isVoid = true;
      gridState[gridState.length - 1 - cell.id!].letter = "";
      removeClue(clues, gridState.length - 1 - cell.id!);
      updateSurroundingCells(gridState, gridState.length - 1 - cell.id!);
      console.log(
        `**settting ${gridState[gridState.length - 1 - cell.id!].id} to void**`
      );
    });
  } else {
    // removeEmpty is false, and so fillGrid is true
  }
  if (emptyCells) {
    fillEmptyAnswers(clues, gridState, setGridState, setClueList);
  }
  setClueNumbersOnClues(clues, gridState);
  setClueNumbers(gridState);
  setClueList(clues);
  setGridState(gridState);
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
    } else {
      return char;
    }
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
  if (clue.answer.includes("") && clue.answer.join("").length !== 0) {
    regExp = arrayToRegularExp(clue.answer)!;

    possibleAnswers = getMatches(
      possibleAnswers,
      regExp,
      clue.answer.join(""),
      clues
    );
  }

  // at this point possibleAnswers is all words N letters long, a filtered array of words N letters long, or possibly empty
  if (possibleAnswers.length !== 0) {
    const clueAnswer =
      possibleAnswers[Math.floor(randVal * possibleAnswers.length)];

    clue.answer = [
      ...(clueAnswer.word !== undefined ? clueAnswer.word! : clueAnswer.raw),
    ];
    clue.raw = [...clueAnswer.raw];
    clue.intersection?.forEach((item) => {
      const clueToUpdate = clues.find((clue) => {
        return clue.id === item.id;
      })!;

      clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
    });
    // console.log(
    //   `setting answer for ${clue.id}, length: ${clue.length}: `,
    //   clue.answer
    // );
    for (let i = 0; i < clue.length; i++) {
      gridState[clue.indices[i]].letter = clue.answer[i];
    }
  } else {
    // from this point - we are dealing with substituting intersecting clues
    // console.log(
    //   `There are no possible answers for clue ${clue.id}`,
    //   clue.answer
    // );

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
      cluesToSwap.push(
        ...clue.intersection!.filter((item) => {
          return item.myIndex === index;
        })
      );

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
    let intersectingClueIndex;
    for (const intersectClue of cluesToSwap) {
      const clueId = intersectClue.id;
      intersectingClueIndex = clue.intersection!.find((item) => {
        return clueId === item.id;
      })!.myIndex!;

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

    replaceClues.forEach((rClue: Clue | undefined) => {
      // console.log("rClue: ", rClue);
      const intersectingClues: Clue[] = [];
      const myIndices: number[] = [];
      const myTempAnswer = [...rClue!.answer];

      for (const intersectObj of rClue!.intersection!) {
        myIndices.push(intersectObj.myIndex);
        const irClue = clues.find((item) => {
          return item.id === intersectObj.id;
        });
        intersectingClues.push(irClue!);
      }

      // console.log(
      //   "clue: ",
      //   clue.id,
      //   "\nreplace clues: ",
      //   replaceClues,
      //   "\nintersect replace clues: ",
      //   intersectingClues
      // );

      intersectingClues.forEach((item) => {
        let irClue;

        // console.log(item.answer.includes(""));

        if (item.answer.includes("")) {
          irClue = rClue!.intersection!.find((intersectObj) => {
            return intersectObj.id === item.id;
          });
        }
        if (irClue) {
          myTempAnswer[irClue.myIndex] = "";
        }
      });

      for (let i = 0; i < myTempAnswer.length; ++i) {
        if (!myIndices.includes(i)) {
          myTempAnswer[i] = "";
        }
      }
      // console.log("myanswer: ", myTempAnswer);

      replaceCluePattern.push(arrayToRegularExp(myTempAnswer)!);
    });

    //------------------------------------------------

    for (const [index, rClue] of replaceClues.entries()) {
      const length = rClue?.length as AnswerLength;
      const wordList = getWordList(length, AllAnswers);

      // console.log(`rClue ${rClue?.id}: `, rClue);

      let candidateAnswers = getMatches(
        wordList,
        replaceCluePattern[index],
        rClue!.answer.join(""),
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
          } else {
            return (
              answer.raw.charAt(sharedLetter.rClueIndex as number) !==
              sharedLetter.letter
            );
          }
        });
      }

      // console.log("candidates: ", candidateAnswers);

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

        // console.log("candidate answers : ",candidateAnswers);

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
            })!;

            clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
          });
          // ****************** update intersecting clues above this
          // updating rclue intersection?
          if (rClue) {
            rClue.intersection?.forEach((item) => {
              item.letter = rClue.answer[item.myIndex];
              const clueToUpdate = clues.find((clue) => {
                return clue.id === item.id;
              })!;
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
  AllAnswers: AllAnswers
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

  const intersection = rClue.intersection!.find((item) => {
    return item.id === currentClue.id;
  });

  if (intersection) {
    sharedLetter.rClueIndex = intersection.myIndex;
    sharedLetter.clueIndex = intersection.yourIndex;
  }

  if (sharedLetter.rClueIndex !== undefined) {
    sharedLetter.letter = rClue.answer[sharedLetter.rClueIndex];
  }

  if (sharedLetter.letter) {
    return sharedLetter;
  }
};

export const initializeApp = (gridState: CellType[]) => {
  const tempGrid = JSON.parse(JSON.stringify(gridState)) as CellType[];

  const clues = createClues(tempGrid);

  const acrossClues = getAcrossClues(clues);
  const downClues = getDownClues(clues);
  for (const clue of clues) {
    if (clue.direction === Direction.DOWN) {
      setCluesThatIntersect(clue, acrossClues);
    } else setCluesThatIntersect(clue, downClues);
  }
  sortCluesDescendingLength(clues);
  // setClueList(clues);
  return clues;
};

const removeClue = (clues: Clue[], index: number): Clue[] => {
  const cluesToRemove = clues.filter((clue) => {
    return clue.indices.includes(index);
  });
  if (!cluesToRemove || cluesToRemove.length === 0) {
    return clues;
  }

  let indicesToRemove: number[] = [];
  if (cluesToRemove !== undefined) {
    for (const clueToRemove of cluesToRemove) {
      const removeId = clueToRemove.id;
      indicesToRemove.push(clues.indexOf(clueToRemove));

      // console.log("clueToRemove intersection: ", clueToRemove.intersection);
      // console.log("clueToRemove: ", clueToRemove)

      for (const intersectObj of clueToRemove.intersection!) {
        let index;
        // get the intersectingClue
        // get the index in the intersectingClue.intersection of: item.id === removeId
        const intersectingClue = clues.find((clueItem) => {
          return clueItem.id === intersectObj.id;
        });
        index = intersectingClue?.intersection!.findIndex(
          (intersectingItem) => {
            return intersectingItem.id === removeId;
          }
        );
        if (index !== undefined) {
          intersectingClue?.intersection?.splice(index, 1);
        }
        // console.log("index: ", index)

        // console.log("spliced intersection: ", intersectingClue?.intersection?.splice(index, 1));
        // console.log("intersecting clue intersection: ", intersectingClue.intersection)
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
  console.log("intersecting clue: ", intersectingClues);
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
  const uniqueLetters: { index: number | undefined; letters: string[] } = {
    index: sharedLetter.clueIndex,
    letters: [],
  };
  console.log("shared letter: ", sharedLetter);
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
  console.log("combos: ", combinations);
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
    })!;
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
export const resetAllAnswers = (
  clueList: Clue[],
  gridState: CellType[],
  setGridState: Dispatch<SetStateAction<CellType[]>>,
  setClueList: Dispatch<SetStateAction<Clue[]>>
) => {
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
    if (cell.letter) {
      delete cell.letter;
    }
  }
  setGridState(grid);
  setClueList(clues);
};

export const fillEmptyAnswers = (
  clueList: Clue[],
  gridState: CellType[],
  setGridState: Dispatch<SetStateAction<CellType[]>>,
  setClueList: Dispatch<SetStateAction<Clue[]>>
) => {
  const clueListCopy = [...clueList];
  const gridStateCopy = [...gridState];
  const incompletes = getIncompleteAnswers(clueListCopy);

  // start of incompletes iteration
  for (const incomplete of incompletes) {
    console.log("***************************");
    console.log("incomplete clue: ", incomplete);
    const allUniqueLetters = [];

    const intersecting = getIntersectingClues(incomplete, clueListCopy);

    for (const clue of intersecting) {
      const resetAnswer = resetIntersectClue(clue, incomplete.id);
      // console.log("the reset answer: ", resetAnswer);
      const pattern = arrayToRegularExp(resetAnswer);
      // console.log("the regexp pattern: ", pattern)
      const wordList = getWordList(
        resetAnswer.length as AnswerLength,
        AllAnswers
      );
      // console.log("word list: ", wordList)
      const matches = getAllMatches(
        wordList,
        pattern,
        clue.answer.join(""),
        clueListCopy
      );
      // console.log("the matches: ", matches);
      const sharedLetter = getLetter(clue, incomplete);
      const uniqueLetters = createUniqueLetterList(
        sharedLetter as SharedLetter,
        matches
      );
      // console.log("unique letters: ", uniqueLetters)
      allUniqueLetters.push(uniqueLetters);
    }
    allUniqueLetters.sort((a, b) => {
      if (a.index !== undefined && b.index !== undefined) {
        return a.index - b.index;
      }
    });
    // console.log("all uniques: ", allUniqueLetters)
    const allCombos = generateCombinations(allUniqueLetters);
    // const allCombos = generateCombinationsWithEmptySpace(allUniqueLetters)
    // console.log("allCombos: ", allCombos)
    // at this point we've generated all letter combinations that might be used to find an answer for the incomplete clue

    // create the patterns
    const patterns: RegExp[] = [];
    for (const combo of allCombos) {
      let patternHolder = new Array(incomplete.answer.length).fill("");

      // console.log("the patt holder: ", patternHolder);
      const indices = Array.from(
        allUniqueLetters,
        (unique) => unique.index as number
      );
      // console.log("the indices", indices)

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
      console.log("pattern: ", pattern);
      const matchingWords = getAllMatches(
        wordList,
        pattern,
        incomplete.answer.join(""),
        clueListCopy
      );
      console.log("the matching words: ", matchingWords);
      if (matchingWords.length > 0) {
        finishLoop = true;
        // set the answer and break
        console.log("the match: ", matchingWords[0]);
        console.log("old clue answer: ", incomplete.answer);
        console.log("*** UPDATED CLUE ANSWER **** ", matchingWords[0]);
        setClueAnswer(matchingWords, incomplete);
        updateGridState(incomplete, gridStateCopy);

        // update intersecting clues
        const cluesToUpdate = updateIntersectingClues(incomplete, clueListCopy);
        // we will have to replace intersecting clue answers where the intersecting letter has been updated
        console.log("****** CLUES TO UPDATE ****** ", cluesToUpdate);
        for (const clue of cluesToUpdate) {
          const resetAnswer = resetClue(clue);
          console.log("reset clue: ", resetAnswer);
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
            console.log("intersecting match: ", matches[0]);
            console.log(`*** SETTING CLUE ANSWER ${clue.id} **** `, matches[0]);
            setClueAnswer(matches, clue);
            updateGridState(clue, gridStateCopy);
          } else {
            console.log(
              "****** NO MATCHES - WIHCH IS ACTUALLY NOT POSSIBLE, SO ... *******"
            );
          }
        }
        // update the clueList React state
        setClueList(clueListCopy);
        setGridState(gridStateCopy);
        // update the grid state
      } else {
        // console.log("*** THERE WERE NO MATCHING WORDS FOR THIS CLUE ANSWER ***")
      }
      if (finishLoop) {
        break;
      }
    }

    // this is the end of the incomplete iteration?
    console.log("***************************");
  }
};

export const resetSelectedCells = (grid: CellType[]) => {
  for (const gridItem of grid) {
    gridItem.selected = false;
  }
};

export const setSelection = (grid: CellType[], clue: Clue) => {
  clue.indices.forEach((index) => {
    grid.find((gridItem) => {
      return gridItem.id === index;
    })!.selected = true;
  });
};

export const setClueNumbersOnClues = (
  clueList: Clue[],
  gridState: CellType[]
) => {
  for (const clue of clueList) {
    console.log("********clue**********", clue);
    const indexOfStartAnswer = clue.indices[0];
    console.log(indexOfStartAnswer);
    if (gridState[indexOfStartAnswer].clueNumber) {
    }
    clue.clueNumber = +gridState[indexOfStartAnswer].clueNumber!;
  }
};
