// models
import { CellType } from "../models/Cell.model";
import Clue from "../classes/Clue";
import { Direction } from "../models/Direction.model";
import Answer from "../models/Answer.model";
import * as AllAnswers from "../data/answers2";
import { Dispatch, SetStateAction } from "react";
import { CgLayoutGrid } from "react-icons/cg";

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
  },
  gridState: CellType[],
  setGridState: Dispatch<SetStateAction<CellType[]>>
) => {
  for (const clue of clues) {
    // let answer: string;
    let possibleAnswers: Answer[] = [];
    const randVal = Math.random();
    let endLoop: boolean = false;

    switch (clue.length) {
      case 13:
        possibleAnswers = AllAnswers.thirteen;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 12:
        possibleAnswers = AllAnswers.twelve;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 11:
        possibleAnswers = AllAnswers.eleven;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 10:
        possibleAnswers = AllAnswers.ten;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 9:
        possibleAnswers = AllAnswers.nine;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 8:
        possibleAnswers = AllAnswers.eight;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 7:
        possibleAnswers = AllAnswers.seven;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 6:
        possibleAnswers = AllAnswers.six;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 5:
        possibleAnswers = AllAnswers.five;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 4:
        possibleAnswers = AllAnswers.four;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      case 3:
        possibleAnswers = AllAnswers.three;
        endLoop = setClueAnswers(
          clues,
          clue,
          possibleAnswers,
          randVal,
          gridState
        );
        break;
      default:
        break;
    }
    if (endLoop) {
      setGridState(gridState);
      break;
    }
  }
  // console.log(clues);
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
    // console.log(`${clue.id}: `, regExp);
    possibleAnswers = possibleAnswers.filter((answer) => {
      if (answer.word !== undefined) {
        return answer.word.match(regExp);
      } else {
        return answer.raw.match(regExp);
      }
    });
  }
  // console.log(`${clue.id}:`, possibleAnswers);
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
      // my index 4 is yourindex 0
      // clueToUpdate[]
    });
    console.log(
      `setting answer for ${clue.id}, length: ${clue.length}: `,
      clue.answer
    );
    for (let i = 0; i < clue.length; i++) {
      gridState[clue.indices[i]].letter = clue.answer[i];
    }
  } else {
    // from this point - we are dealing with substituting intersecting clues
    console.log(
      `There are no possible answers for clue ${clue.id}`,
      clue.answer
    );

    // *** testing only
    // logIntersectClueAnswers(clue.intersection, clues);
    // *** testing only

    // do something else useful here
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
    // for each Clue in cluesToSwap, (these are the clues that intersect with the current clue's index), we look in the current clue's  intersection prop and return the object in there that matches the ID of our Clue. This object is of the form:
    // {id: '4DOWN', myIndex: 4, yourIndex: 2, letter: ''}
    // then we set the letter prop of our Clue to equal the letter that occurs in our current clue at the myIndex prop of the intersection object with the matching ID (this is not good code)
    // lastly, for each intersection object, we take the id and find the Clue in clues that matches that ID and push it into a replaceClues array.
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
      //   console.log("rClue: ", rClue);
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

      console.log(
        "clue: ",
        clue.id,
        "\nreplace clues: ",
        replaceClues,
        "\nintersect replace clues: ",
        intersectingClues
      );

      intersectingClues.forEach((item) => {
        let irClue;

        console.log(item.answer.includes(""));
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
      console.log("myanswer: ", myTempAnswer);
      replaceCluePattern.push(arrayToRegularExp(myTempAnswer)!);
    });

    //------------------------------------------------

   
    for(const [index, rClue] of replaceClues.entries()) {
      
      const length = rClue.length as AnswerLength;
      const wordList = getWordList(length, AllAnswers);
      console.log(`rClue ${rClue.id}: `, rClue);

      let candidateAnswers = getMatches(
        wordList,
        replaceCluePattern[index],
        rClue.answer.join("")
      );

      const sharedLetter = getLetter(rClue, clue);

      if (sharedLetter && sharedLetter.rClueIndexndex !== undefined) {
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

      console.log("candidates: ", candidateAnswers);

     
      const usedLetters = [sharedLetter.letter];
      const uniqueAnswers = [];

      for (const answer of candidateAnswers) {
        let candidateAnswer: string;
        if (answer.word) {
          candidateAnswer = answer.word;
        } else candidateAnswer = answer.raw;
        if (
          sharedLetter &&
          sharedLetter.rClueIndex !== undefined &&
          !usedLetters.includes(candidateAnswer[sharedLetter.rClueIndex as number])
        ) {
          usedLetters.push(candidateAnswer[sharedLetter.rClueIndex as number]);
          uniqueAnswers.push(candidateAnswer);
        }
      }
      for(const answer of uniqueAnswers){
        // example, the answer we are replacing is meteoric, the first alt is historic
        clue.answer[sharedLetter?.clueIndex] = answer[sharedLetter?.rClueIndex];
        console.log(clue.answer);
      }
      console.log("rClue: ", rClue);
      console.log("usedLetters: ", usedLetters);
      console.log("uniqueAnswers: ", uniqueAnswers);
      // when a new answer is chosen, we also need to update the list of 'used' letters
    }
    return true;
  }
  return false;
};

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

type AnswerLength = keyof typeof AnswerMapping;
type AllAnswerKey = keyof typeof AllAnswers;

const getWordList: (
  answerLength: AnswerLength,
  AllAnswers: AllAnswers
) => Answer[] = (answerLength, AllAnswers) => {
  const allAnswerKey: AllAnswerKey = AnswerMapping[answerLength];
  return AllAnswers[allAnswerKey];
};

const getMatches = (
  possibleAnswers: Answer[],
  regExp: RegExp,
  currentAnswer: string
) => {
  const candidateAnswers = possibleAnswers.filter((answer) => {
    if (answer.word !== undefined && answer.word !== currentAnswer) {
      return answer.word.match(regExp);
    } else if (answer.raw !== currentAnswer) {
      return answer.raw.match(regExp);
    }
  });
  return candidateAnswers;
};
// ** testing only
const logIntersectClueAnswers = (
  intersection:
    | {
        id: string;
        myIndex: number;
        yourIndex: number;
        letter?: string | undefined;
      }[]
    | undefined,
  clues: Clue[]
) => {
  const intersectClues: Clue[] = [];
  intersection!.forEach((item) => {
    clues.find((intersectingClue) => {
      if (item.id === intersectingClue.id) {
        intersectClues.push(intersectingClue);
      }
    });
  });
  for (const intersectClue of intersectClues) {
    console.log(`answer of ${intersectClue.id}: `, intersectClue.answer);
  }
};

export const getLetter = (rClue: Clue, currentClue: Clue) => {
  interface SharedLetter {
    rClueIndex: number | undefined;
    clueIndex: number | undefined;
    letter: string | undefined;
  }
  const sharedLetter: SharedLetter = { rClueIndex: undefined, letter: undefined, clueIndex: undefined };

  const intersection = rClue.intersection!.find((item) => {
    return item.id === currentClue.id;
  });

  if(intersection){
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
