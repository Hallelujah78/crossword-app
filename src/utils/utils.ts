// models

import Clue from "../classes/Clue";
import type { AllAnswerKey } from "../models/AllAnswerKey.model";
import type Answer from "../models/Answer.model";
import type { AnswerLength } from "../models/AnswerLength.model";
import { AnswerMapping } from "../models/answerLength";
import type { CellType } from "../models/Cell.model";
import { Direction } from "../models/Direction.model";
import type { Intersection } from "../models/Intersection.model";
import type { Storage } from "../models/LocalStorage.model";
import type { Puzzles } from "../models/Puzzles.model";
import type { SharedLetter } from "../models/SharedLetter.model";
import type { AllAnswersType } from "../state/answers2";
// state
import * as AllAnswers from "../state/answers2";
import backgroundColors from "../state/backgroundColors";
import { gridSideLength } from "../state/grid";

// grid navigation
// used
export const getCellAbove = (grid: CellType[], index: number) => {
	if (grid[index - Math.sqrt(grid.length)]) {
		return grid[index - Math.sqrt(grid.length)];
	}
};

// grid navigation
// used
export const getCellBelow = (grid: CellType[], index: number) => {
	if (grid[index + Math.sqrt(grid.length)]) {
		return grid[index + Math.sqrt(grid.length)];
	}
};

// grid navigation
// used
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

// grid navigation
// used
export const findLeftEdge = (grid: CellType[]) => {
	const leftIndices: number[] = [];
	const gridLength: number = grid.length; // 169
	const sideLength = Math.sqrt(grid.length); // 13
	for (let index = 0; index <= gridLength - sideLength; index += sideLength) {
		leftIndices.push(index);
	}
	return leftIndices;
};

// grid navigation
// used
export const findTopEdge = (grid: CellType[]) => {
	const topIndices: number[] = [];
	const sideLength = Math.sqrt(grid.length); // 13
	for (let index = 0; index < sideLength; ++index) {
		topIndices.push(index);
	}
	return topIndices;
};

// grid navigation
// used
export const findBottomEdge = (grid: CellType[]) => {
	const bottomIndices: number[] = [];
	const gridLength: number = grid.length; // 169
	const sideLength = Math.sqrt(grid.length); // 13
	for (let index = gridLength - 1; index >= gridLength - sideLength; --index) {
		bottomIndices.push(index);
	}
	return bottomIndices;
};

// crossword domain, so crossword/crosswordRules.ts?
// used
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

// crossword domain - grid structure
// used
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

// grid navigation
// used
export const isLeftEdge = (grid: CellType[], index: number) => {
	return findLeftEdge(grid).includes(index);
};

// grid navigation
// used
export const isRightEdge = (grid: CellType[], index: number) => {
	return findRightEdge(grid).includes(index);
};

// grid navigation
// used
export const isTopEdge = (grid: CellType[], index: number) => {
	return findTopEdge(grid).includes(index);
};

// grid navigation
// used
export const isBottomEdge = (grid: CellType[], index: number) => {
	return findBottomEdge(grid).includes(index);
};

// Initialize some props on the grid such as id, answer, letter and set the top,bottom,left, and right props to false if the cell in that direction is a void
// grid structure
// used
export const initializeGrid = (grid: CellType[]) => {
	const newGrid = grid.map((item, index) => {
		item.id = index;
		item.guess = "";
		item.solution = "";
		// If cell above current cell exists and is void
		if (getCellAbove(grid, index)?.isVoid) {
			// set top prop to false
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

// Create Clue instances
// domain logic, clues.ts
// used
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
				"",
			);

			let isCell = true;
			let startIndex = currIndex;
			while (isCell) {
				if (grid[startIndex].right) {
					acrossClue.length = acrossClue.length + 1;
					acrossClue.indices.push(startIndex + 1);
					acrossClue.solution.push("");
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
				"",
			);

			let isCell = true;
			let startIndex = currIndex;
			while (isCell) {
				if (grid[startIndex].bottom) {
					downClue.length = downClue.length + 1;
					const cellBelow = getCellBelow(grid, startIndex);
					if (cellBelow) {
						downClue.indices.push(+cellBelow.id);
						downClue.solution.push("");
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

// Takes an array of CellType objects. Iterates over the array and if the item has its
// clueNumber prop set (not empty string) then we push the index of the cell to a local array. Returns an array of numbers representing the indices where clues start.
// domain - clues.ts
// used
export const getClueIndices = (grid: CellType[]) => {
	const clueIndices: number[] = [];
	grid.forEach((item, index) => {
		item.clueNumber && clueIndices.push(index);
	});
	return clueIndices;
};

// puzzle generation/fill layer - deserves its own file
// used
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
	removeEmpty: boolean,
) => {
	// Deep copy the React state values
	const newState = {
		clues: JSON.parse(JSON.stringify(cluesState)) as Clue[],
		grid: JSON.parse(JSON.stringify(grid)) as CellType[],
	};

	// Iterate over the clues
	for (const clue of newState.clues) {
		// Declare variable to store possible answers we can use
		let possibleAnswers: Answer[] = [];
		// Generate a random value between 0 and 1
		const randVal = Math.random();

		// Switch to deal with clues of different length
		switch (clue.length) {
			case 13:
				// Possible answers are all answers of a given length
				possibleAnswers = AllAnswers.thirteen;
				// Long complex function
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 12:
				possibleAnswers = AllAnswers.twelve;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 11:
				possibleAnswers = AllAnswers.eleven;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 10:
				possibleAnswers = AllAnswers.ten;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 9:
				possibleAnswers = AllAnswers.nine;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 8:
				possibleAnswers = AllAnswers.eight;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 7:
				possibleAnswers = AllAnswers.seven;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 6:
				possibleAnswers = AllAnswers.six;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 5:
				possibleAnswers = AllAnswers.five;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 4:
				possibleAnswers = AllAnswers.four;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			case 3:
				possibleAnswers = AllAnswers.three;
				setClueAnswers(
					newState.clues,
					clue,
					possibleAnswers,
					randVal,
					newState.grid,
				);
				break;
			default:
				break;
		}
	}

	// At this point we may have successfully filled in all clues. Every cell may have its letter prop set to the letter of the answer we have generated.

	// There may be empty cells after answers are populated. Get these empty cells.
	const emptyCells = newState.grid.filter(
		(cell) => !cell.isVoid && (cell.solution === undefined || cell.solution === ""),
	);

	// gridState
	if (removeEmpty) {
		// removeEmpty is a UI/state flag
		// For every empty cell (no letter prop)
		for (const cell of emptyCells) {
			// Set the cell to void
			cell.isVoid = true;
			// Remove the clue
			removeClue(newState.clues, cell.id);
			// Update the surrounding cells
			updateSurroundingCells(newState.grid, cell.id);

			// Maintain rotational symmetry of the grid
			// Set cell to void
			newState.grid[newState.grid.length - 1 - cell.id].isVoid = true;
			// Set the letter to empty string
			newState.grid[newState.grid.length - 1 - cell.id].solution = "";
			// Remove the clue
			removeClue(newState.clues, newState.grid.length - 1 - cell.id);
			// Update surrounding cells
			updateSurroundingCells(newState.grid, newState.grid.length - 1 - cell.id);
		}
		// Check if grid is valid
		let valid = validateGrid(newState.clues, newState.grid);
		// If grid not valid
		if (!valid) {
			// Reset island cell (not sure what this means)
			resetIslandCell(newState.grid);
			// Validate grid again
			valid = validateGrid(newState.clues, newState.grid);
		}
	}
	// remove empty is false, if there are empty cells
	else if (emptyCells && emptyCells.length > 0) {
		// Try to fill the empty cells
		const updatedState = resolveIncompleteClues(newState.clues, newState.grid);
		if (updatedState?.clues) {
			// Use the clues
			newState.clues = updatedState.clues;
		}
		if (updatedState?.grid) {
			// Use the grid
			newState.grid = updatedState.grid;
		}
	}
	// Set the clue numbers on the clues
	updateClueNumbersFromGrid(newState.clues, newState.grid);
	// Set the clues numbers on the cells in the grid
	setClueNumbers(newState.grid);
	// Return the new state with the updated clues and grid
	return newState;
};

// clues.ts
// used
export const sortCluesDescendingLength = (clues: Clue[]) => {
	return clues.sort((a: Clue, b: Clue) => {
		return b.length - a.length;
	});
};

// Used for data normalization but not used in the application.
// data/answers/normalize.ts or data/normalizeAnswers.ts
// unused
export const removeChars = (answers: Answer[]) => {
	for (const answer of answers) {
		if (answer.raw.includes("-") || answer.raw.includes("'")) {
			answer.word = answer.raw.replace(new RegExp(/[-']/, "g"), "");
			answer.length = answer.word.length;
		}
	}
};

// Takes a large array of Answers with different word lengths and a wordLengh param.
// Returns an array of Answer objects containing only Answers of the given wordLength.
// data/answers/normalize.ts or data/normalizeAnswers.ts
// unused
export const separateByLength = (answers: Answer[], wordLength: number) => {
	const filteredAnswers = answers.filter((answer) => {
		return answer.length === wordLength;
	});
	return filteredAnswers;
};

// clues.ts
// used
export const getAcrossClues = (clues: Clue[]) => {
	return clues.filter((clue) => {
		return clue.direction === Direction.ACROSS;
	});
};

// clues.ts
// used
export const getDownClues = (clues: Clue[]) => {
	return clues.filter((clue) => {
		return clue.direction === Direction.DOWN;
	});
};

// clues.ts or clue/relationships.ts
// used
export const setCluesThatIntersect = (currClue: Clue, clues: Clue[]) => {
	const { indices } = currClue;
	const intersection = [];
	// iterate over every clue
	for (const clue of clues) {
		// iterate over each index of currClue
		for (const index of indices) {
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

// crossword/generator.ts
// used
export const createAnswerRegex = (answer: string[]) => {
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

// used exclusively in populateClues
const setClueAnswers = (
	clues: Clue[],
	clue: Clue,
	possibleAnswers: Answer[],
	randVal: number,
	gridState: CellType[],
) => {
	// if an answer has some letters but is not complete, create a regexp, and get all words that match that pattern
	let regExp: RegExp;
	let candidateAnswers = possibleAnswers;

	if (clue.solution.includes("") && clue.solution.join("").length !== 0) {
		regExp = createAnswerRegex(clue.solution) as RegExp;

		candidateAnswers = getMatches(
			possibleAnswers,
			regExp,
			clue.solution.join(""),
			clues,
		);
	}

	// at this point possibleAnswers is all words N letters long, a filtered array of words N letters long, or possibly empty
	if (candidateAnswers.length !== 0) {
		const clueAnswer =
			candidateAnswers[Math.floor(randVal * candidateAnswers.length)];

		clue.solution = [
			...(clueAnswer.word !== undefined && clueAnswer.word !== null
				? clueAnswer.word
				: clueAnswer.raw),
		];
		clue.raw = [...clueAnswer.raw];

		if (clue.intersection) {
			for (const item of clue.intersection) {
				const clueToUpdate = clues.find((clue) => clue.id === item.id);
				if (clueToUpdate) {
					clueToUpdate.solution[item.yourIndex] = clue.solution[item.myIndex];
				}
			}
		}

		for (let i = 0; i < clue.length; i++) {
			gridState[clue.indices[i]].solution = clue.solution[i];
		}
	} else {
		// from this point - we are dealing with substituting intersecting clues

		const letterIndex = [];
		const patterns = [];
		const tempAnswer = [...clue.solution];
		const cluesToSwap = []; // holds the id and yourIndex
		const replaceClues: (Clue | undefined)[] = [];

		// this for loop does two things
		// 1) it resets each element of tempAnswer to be an empty string
		// eg ['', '', '', '', '']
		// 2) it populates letterIndex with the index at which a letter occurred in tempAnswer before it is reset
		for (const letter of tempAnswer) {
			if (letter) {
				letterIndex.push(tempAnswer.indexOf(letter));
				tempAnswer[clue.solution.indexOf(letter)] = "";
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
			const tempAnswer = [...clue.solution];
			tempAnswer[index] = "";
			if (clue.intersection) {
				cluesToSwap.push(
					...clue.intersection.filter((item) => {
						return item.myIndex === index;
					}),
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
				intersectClue.letter = clue.solution[intersectingClueIndex];

			replaceClues.push(
				clues.find((item) => {
					return intersectClue.id === item.id;
				}),
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
			if (rClue?.intersection && rClue?.solution) {
				myTempAnswer = [...rClue.solution];

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

				if (item.solution.includes("")) {
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
			// createAnswerRegex returns undefined if myTempAnswer DOES NOT include empty strings
			// this implies that the answer is full
			// this also means that we are pushing undefined values to replaceCluePatterns
			const pattern = createAnswerRegex(myTempAnswer);
			if (pattern) replaceCluePattern.push(pattern);
		}

		//------------------------------------------------

		for (const [index, rClue] of replaceClues.entries()) {
			const length = rClue?.length as AnswerLength;
			const wordList = getWordList(length, AllAnswers);
			let candidateAnswers: Answer[] = [];
			if (rClue) {
				candidateAnswers = getMatches(
					wordList,
					replaceCluePattern[index],
					rClue.solution.join(""),
					clues,
				);
			}
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
						candidateAnswer[sharedLetter.rClueIndex as number],
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
					candidateAnswer = [...clue.solution];
					candidateAnswer[sharedLetter.clueIndex] =
						word[sharedLetter.rClueIndex];
					regExp = createAnswerRegex(candidateAnswer);
				}

				const wordList = getWordList(
					clue.solution.length as AnswerLength,
					AllAnswers,
				);

				const candidateAnswers = getMatches(
					wordList,
					regExp,
					candidateAnswer.join(""),
					clues,
				);

				if (candidateAnswers.length > 0) {
					if (candidateAnswers[0].word) {
						clue.solution = [...candidateAnswers[0].word];
					} else {
						clue.solution = [...candidateAnswers[0].raw];
					}
					clue.raw = [...candidateAnswers[0].raw];

					if (rClue) {
						// if word exists on answer, then word refers to the word prop (including hyphens etc), else it refers to raw
						rClue.solution = [...word];

						rClue.raw = [...answer.raw];
					}

					// ****************** update intersecting clues below this
					// clue.intersection?.forEach((item) =>
					let clueToUpdate: Clue | undefined;
					if (clue.intersection) {
						for (const item of clue.intersection) {
							item.letter = clue.solution[item.myIndex];
							clueToUpdate = clues.find((clue) => {
								return clue.id === item.id;
							});

							if (clueToUpdate !== undefined)
								clueToUpdate.solution[item.yourIndex] = clue.solution[item.myIndex];
						}
					}
					// ****************** update intersecting clues above this
					// updating rclue intersection?
					if (rClue && rClue.intersection !== undefined) {
						// rClue.intersection?.forEach((item) =>
						for (const item of rClue.intersection) {
							item.letter = rClue.solution[item.myIndex];
							const clueToUpdate = clues.find((clue) => {
								return clue.id === item.id;
							});
							if (clueToUpdate)
								clueToUpdate.solution[item.yourIndex] =
									rClue.solution[item.myIndex];
						}
					}

					// update the grid state with the letters
					for (let i = 0; i < clue.length; i++) {
						gridState[clue.indices[i]].solution = clue.solution[i];
					}
					if (rClue) {
						for (let i = 0; i < rClue.length; i++) {
							gridState[rClue.indices[i]].solution = rClue.solution[i];
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

// const AnswerMapping = {
// 	3: "three",
// 	4: "four",
// 	5: "five",
// 	6: "six",
// 	7: "seven",
// 	8: "eight",
// 	9: "nine",
// 	10: "ten",
// 	11: "eleven",
// 	12: "twelve",
// 	13: "thirteen",
// } as const;

// export type AnswerLength = keyof typeof AnswerMapping;
// export type AllAnswerKey = keyof typeof AllAnswers;

// Returns an array of Answer objects where the length of each word is answerLength
// used
export const getWordList: (
	answerLength: AnswerLength,
	AllAnswers: AllAnswersType,
) => Answer[] = (answerLength, AllAnswers) => {
	const allAnswerKey: AllAnswerKey = AnswerMapping[answerLength];
	return AllAnswers[allAnswerKey];
};

// getMatches exludes the current answer.
// possibleAnswers: Array of Answer objects that match the length of currentAnswer.
// regExp: a RegExp pattern that we match against
// currentAnswer: The current answer we have.
// clues: an array of Clue instances that make up the crossword
// used
export const getMatches = (
	possibleAnswers: Answer[],
	regExp: RegExp | undefined,
	currentAnswer: string,
	clues: Clue[],
) => {
	if (!regExp) {
		// No regexp, so can't match
		return [];
	}
	// Store completed generated answers
	const currentAnswers: string[] = [];

	// For each clue in clues param
	for (const clue of clues) {
		// Get the answer for the clue
		const completedAnswer = clue.solution;
		// If completedAnswer doesn't include an empty string, it is complete
		if (!completedAnswer.includes("")) {
			// Join the current answer array and add it to currentAnswers array
			currentAnswers.push(completedAnswer.join(""));
		}
	}

	const candidateAnswers = possibleAnswers.filter((answer) => {
		// answer.word can be undefined, excludes hyphens
		// answer.word is only included if answer.raw contains hyphens
		if (
			answer.word !== undefined && // omit words where answer.word is undefined
			answer.word !== currentAnswer && // omit currentAnswer from results
			!currentAnswers.includes(answer.word) // don't add answer.word twice
		) {
			return answer.word.match(regExp); // return true if answer.word matches regExp
		}

		// answer.raw includes hyphens
		if (answer.raw !== currentAnswer && !currentAnswers.includes(answer.raw)) {
			return answer.raw.match(regExp);
		}
		return false;
	});
	return candidateAnswers;
};

// Get candidate answers for a clue. Exclude words already used but include the current answer we pass in.
// used
export const getAllMatches = (
	possibleAnswers: Answer[],
	regExp: RegExp | undefined,
	currentAnswer: string,
	clues: Clue[],
) => {
	if (!regExp) {
		return [];
	}

	// Store complete clue answers
	const currentAnswers: string[] = [];

	// For each clue
	for (const clue of clues) {
		// Get the clue answer
		const clueAnswer = clue.solution;
		// If clue answer is complete (contains no empty strings) and clueAnswer is not our currentAnswer
		if (!clueAnswer.includes("") && clueAnswer.join("") !== currentAnswer) {
			// Store our clue answer in the currentAnswers array
			currentAnswers.push(clueAnswer.join(""));
		}
	}

	const candidateAnswers = possibleAnswers.filter((answer) => {
		if (answer.word !== undefined && !currentAnswers.includes(answer.word)) {
			return answer.word.match(regExp);
		}
		if (!currentAnswers.includes(answer.raw)) {
			return answer.raw.match(regExp);
		}
		return false;
	});
	return candidateAnswers;
};

// Takes two clues. Attempts to set props on a sharedLetter object if both clues intersect. Returns sharedLetter or undefined.
// used
// runs
export const getLetter = (rClue: Clue, currentClue: Clue) => {
	const sharedLetter: SharedLetter = {
		rClueIndex: undefined,
		letter: undefined,
		clueIndex: undefined,
	};
	let intersection: Intersection | undefined;
	// If the clue to be replaced has an intersection prop
	if (rClue.intersection) {
		// Set intersection to be the info relating to current clue
		intersection = rClue.intersection.find((item) => {
			return item.id === currentClue.id;
		});
	}
	// If intersection was set above
	if (intersection) {
		// Set the index props on shared letter for rClue and clue
		sharedLetter.rClueIndex = intersection.myIndex;
		sharedLetter.clueIndex = intersection.yourIndex;
	}

	// If rClueIndex was set above
	if (sharedLetter.rClueIndex !== undefined) {
		// Set the letter prop on sharedLetter
		sharedLetter.letter = rClue.solution[sharedLetter.rClueIndex];
	}

	if (sharedLetter.letter !== undefined) {
		return sharedLetter;
	}
};

export const createCluesFromGrid = (grid: CellType[]) => {
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


// Takes an array of Clue instances and attempts to remove the clue(s) with the given index. Each clue that intersects with this clue will have an object that denotes the intersection in its `intersection` prop - this also needs to be removed. Returns the updated array of Clue instances.
// used
const removeClue = (clues: Clue[], index: number): Clue[] => {
	const cluesToRemove = clues.filter((clue) => {
		return clue.indices.includes(index);
	});
	// If cluesToRemove is undefined or has length zero
	if (!cluesToRemove || cluesToRemove.length === 0) {
		// Return clues early
		return clues;
	}

	const indicesToRemove: number[] = [];
	if (cluesToRemove !== undefined) {
		for (const clueToRemove of cluesToRemove) {
			// Get the id of each clue to be removed
			const removeId = clueToRemove.id;
			// Get position in Clues of clueToRemove
			indicesToRemove.push(clues.indexOf(clueToRemove));

			if (
				clueToRemove !== undefined &&
				clueToRemove.intersection !== undefined
			) {
				// For each object in the intersection prop of the clue to be removed
				for (const intersectObj of clueToRemove.intersection) {
					let index: number | undefined;
					// get the intersectingClue
					// get the index in the intersectingClue.intersection of: item.id === removeId
					const intersectingClue = clues.find((clueItem) => {
						return clueItem.id === intersectObj.id;
					});
					// Get the index of the object in the intersection prop of our intersecting clue
					index = intersectingClue?.intersection?.findIndex(
						(intersectingItem) => {
							return intersectingItem.id === removeId;
						},
					);
					if (index !== undefined) {
						// Remove the object that relates to the clue we are removing from the intersectingClue's intersection prop
						intersectingClue?.intersection?.splice(index, 1);
					}
				}
			}
		}
	}
	if (indicesToRemove.length > 0) {
		// Sort indicesToRemove in descending order to avoid removing incorrect elements
		indicesToRemove.sort((a,b) => b - a)
		for (const index of indicesToRemove) {
			// Remove the clue to be removed from clues
			clues.splice(index, 1);
		}
	}
	return clues;
};

// Takes a Clue instance and an array of Clue instances. Returns an array of Clue instances that intersect with our Clue instance.
// used
export const getIntersectingClues = (clue: Clue, clues: Clue[]) => {
	// Get the intersection prop of clue
	const intersection = clue?.intersection;
	// Declare var to store Clue instances that intersect with Clue
	const intersectingClues: Clue[] = [];
	if (intersection) {
		for (const intersectObject of intersection) {
			const intersectingClue = clues.find((clue) => {
				return clue.id === intersectObject.id;
			});
			if (intersectingClue) {
				// Add intersecting clue to array
				intersectingClues.push(intersectingClue);
			}
		}
	}
	return intersectingClues;
};

// Takes an array of Clue instances and filters them, only returning those that are incomplete - i.e. we haven't generated a complete answer. 
// used
export const getIncompleteAnswers = (clues: Clue[]) => {
	const incomplete = clues.filter((clue) => {
		return clue.solution.includes("");
	});
	return incomplete;
};

// Resets letters in an intersecting clue when a connected clue is being regenerated.
//
// Creates a copy of the intersecting clue's answer array and clears letters that
// are no longer constrained by other clues.
//
// Letters that intersect with clues OTHER than `currClueId` are preserved.
// Letters that intersect only with `currClueId` (the clue being replaced)
// are cleared, along with any non-intersecting letters.
//
// Returns the updated answer array without mutating the original clue.
// used
export const resetIntersectingClueLetters = (iClue: Clue, currClueId: string) => {
	// Copy the intersecting clue's answer prop to avoid mutation
	const tempAnswer = [...iClue.solution];
	
	// Store indices where iClue.answer intersects with other clues
	const sharedIndices: number[] = [];

	// If the intersecting Clue has a defined intersection prop
	if (iClue.intersection !== undefined) {
		// Iterate over intersection objects
		for (const item of iClue.intersection) {
			// Exclude Clue with id currClueId
			if (item.id !== currClueId) {
				// Push the position of the intersecting letter to sharedIndices
				sharedIndices.push(item.myIndex);
			}
		}
	}

	// For each entry in the iClue answer array
	for (const [index, _letter] of iClue.solution.entries()) {
		// If entry is not shared with other clues
		if (!sharedIndices.includes(index)) {
			// Set the entry to an empty string
			tempAnswer[index] = "";
		}
	}
	return tempAnswer;
};


// Given a shared letter between two intersecting clues and a list of
// candidate answers for one of the clues, determine which letters
// could appear in the shared grid cell.
//
// Extracts the letter at `rClueIndex` from each candidate answer and
// returns the unique set of letters that could occupy that position.
// The returned object contains the index of the shared position in
// the other clue (`clueIndex`) and the list of possible letters.
// used
export const getUniqueIntersectingLetters = (
	sharedLetter: SharedLetter,
	matches: Answer[],
) => {
	// If either of the clue indices on sharedLetter are undefined
	if (
		sharedLetter.clueIndex === undefined ||
		sharedLetter.rClueIndex === undefined
	) {
		// throw an error
		throw new Error(
			"error in getUniqueIntersectingLetters: a property of sharedLetter is undefined",
		);
	}
	// Create a temp object we can return. Store the clue's index and an array of letters.
	const uniqueLetters: { index: number; letters: string[] } = {
		index: sharedLetter.clueIndex,
		letters: [],
	};

	// For each item in matches
	for (const match of matches) {
		// Set word to match.word if word truthy, otherwise set to match.raw
		const word = match.word ? match.word : match.raw;
		
		if (
			// Exclude letters already in uniqueLetters
			!uniqueLetters.letters.includes(word[sharedLetter.rClueIndex as number])
		) {
			// Add the letter that appears at rClueIndex in word
			uniqueLetters.letters.push(word[sharedLetter.rClueIndex as number]);
		}
	}
	return uniqueLetters;
};

// Recursively generates all possible combinations of letters based on
// allowed letters at specific clue positions.
//
// `options` contains objects describing constrained positions in a clue.
// Each object includes:
//   - `index`: the position in the clue
//   - `letters`: the set of letters that can appear at that position.
//
// The function returns all possible combinations of these letters,
// representing every possible assignment of letters to the constrained
// positions.
// used
export function generateIntersectionLetterCombinations(
	options: { index: number | undefined; letters: string[] }[],
	currentIndex = 0,
	currentCombination: string[] = [],
): string[][] {
	// Base case: if we have reached the last index, add the current combination to the result
	if (currentIndex === options.length) {
		return [currentCombination];
	}

	const currentOptions = options[currentIndex].letters;
	const combinations: string[][] = [];

	// Iterate over each option for the current index
	for (const option of currentOptions) {
		// Create a copy of the current combination
		const newCombination: string[] = [...currentCombination];
		// Set the current option at the current index
		newCombination[currentIndex] = option;
		// Recursively generate combinations for the next index
		const nextCombinations = generateIntersectionLetterCombinations(
			options,
			currentIndex + 1,
			newCombination,
		);
		// Add the combinations generated for the next index to the result
		combinations.push(...nextCombinations);
	}
	return combinations;
}

// Takes an array of candidate answers and assigns the first candidate
// to the given clue.
//
// If the candidate has a `word` property, the clue's `answer` is set to
// that value. Otherwise the `raw` value is used.
//
// The clue's `raw` property is always set from the candidate's `raw` value.
//
// NOTE: This function only uses the first candidate answer in the array.

export const applyCandidateAnswerToClue = (candidateAnswers: Answer[], clue: Clue) => {
	if (candidateAnswers.length > 0) {
		if (candidateAnswers[0].word) {
			clue.solution = [...candidateAnswers[0].word];
		} else {
			clue.solution = [...candidateAnswers[0].raw];
		}
		clue.raw = [...candidateAnswers[0].raw];
	}
};


// Propagates letters from a clue to all clues that intersect with it.
//
// For each intersection:
// - The shared letter from the current clue is copied into the
//   intersecting clue's answer at the appropriate position.
// - If this changes the intersecting clue's letter, that clue is
//   returned so its candidate answers can be recomputed.
//
// Returns an array of intersecting clues whose letters were updated.
// used
export const propagateIntersectionLetters = (clue: Clue, clues: Clue[]) => {
	// we'll return clues that have been updated, maybe
	const cluesToUpdate: Clue[] = [];
	let oldLetter = "";
	let newLetter = "";

	// If clue has an intersection prop
	if (clue.intersection) {
		// Iterate over each item in the intersection prop array
		for (const item of clue.intersection) {
			// Set item letter to the letter in clue's answer at appropriate index 
			item.letter = clue.solution[item.myIndex];
			// Get a reference to the intersecting clue we must update
			const clueToUpdate = clues.find((clue) => {
				return clue.id === item.id;
			});

			// If there is a clue to be updated
			if (clueToUpdate) {
				// Get a ref to the current value of letter in intersecting clue's answer at appropriate index
				oldLetter = clueToUpdate.solution[item.yourIndex];
				// Get a ref to the current value of letter in clue's answer at appropriate index
				newLetter = clue.solution[item.myIndex];
				// Update the intersecting clue's answer prop with the new letter at appropriate index
				clueToUpdate.solution[item.yourIndex] = newLetter;

				// if the shared letter has updated, then we need to replace the answer for the updated clue
				if (oldLetter !== newLetter) {
					// Add clue to update to return array
					cluesToUpdate.push(clueToUpdate);
				}
			}
		}
	}
	// Return clues to update array
	return cluesToUpdate;
};


// Clears letters in a clue that are not constrained by intersections.
// Letters that belong to crossing clues are preserved.
// Returns a new answer array without mutating the original clue.
// used 
export const resetClueLetters = (clue: Clue) => {
	// Copy the given clue's answer
	const tempAnswer = [...clue.solution];
	// Store indices that intersect
	const sharedIndices: number[] = [];

	// If clue has intersection prop
	if (clue.intersection) {
		// Iterate over each item in intersection
		for (const item of clue.intersection) {
			// Add the myIndex value to the shared indices array
			sharedIndices.push(item.myIndex);
		}
	}

	// Iterate over the clue's answer prop
	for (const [index, _letter] of clue.solution.entries()) {
		// If the position in answer does not intersect
		if (!sharedIndices.includes(index)) {
			// Set the position in temp answer to an empty string
			tempAnswer[index] = "";
		}
	}
	// Return the Clue's answer with non-intersecting positions set to an empty string
	return tempAnswer;
};

// Writes a clue's answer letters into the corresponding cells of the grid.
// Each letter in `clue.answer` is copied into the grid cell referenced by
// the matching index in `clue.indices`.
//
// Mutates `gridState`.
// used
export const writeClueToGrid = (clue: Clue, gridState: CellType[]) => {
	for (let i = 0; i < clue.length; i++) {
		gridState[clue.indices[i]].solution = clue.solution[i];
	}
};


// Resets all generated solutions and user-entered answers while preserving
// the crossword structure (grid layout, clue definitions, and intersections).
//
// Performs the following:
//   - Creates shallow copies of the clues and grid arrays
//   - Clears all generated answers in clues
//   - Clears stored raw answers
//   - Clears intersection letters
//   - Clears all user-entered cell answers
//   - Clears solution letters stored in cells
//   - Resets cell selection state
//
// Returns updated `clues` and `grid` arrays.
// used
export const resetPuzzleAnswers = (clueList: Clue[], gridState: CellType[]) => {
	const clues = [...clueList];
	const grid = [...gridState];

	// For each Clue in clues
	for (const clue of clues) {
		// Create an array of empty strings we can use to reset the `answer` prop
		const emptyAnswer = new Array(clue.solution.length).fill("");
		// Set the `answer` prop to an array of empty strings
		clue.solution = emptyAnswer;
		// Set `clue.raw` to an array with one empty string
		clue.raw = [""]; // Should this also be set to empty answer?

		// If `clue.intersecton` is defined
		if (clue.intersection) {
			// For each object in the `intersection` array
			for (const intersectObj of clue.intersection) {
				// If the letter prop exists/isn't already falsy (empty string)
				if (intersectObj.letter) {
					// Set the `letter` prop to empty string
					intersectObj.letter = "";
				}
			}
		}
	}
	// For each Cell in the grid
	for (const cell of grid) {
		// Reset the answer the user has input
		cell.guess = "";
		// Set all cells to not be selected
		cell.selected = false;
		// If Cell has a `letter` set (not undefined and not empty string)
		if (cell.solution) {
			// Set the cell's `letter` prop to an empty string
			cell.solution = ""; // this was deleting cell.letter
		}
	}
	// Return the updated grid and clues
	return { grid, clues };
};


// Attempts to resolve clues with incomplete solutions using intersection
// constraints from other clues in the grid.
//
// Takes an array of `Clue` instances and the crossword `gridState`.
// Returns updated copies of both.
//
// High-level process:
//   - Copy the clue and grid state to avoid mutating the originals
//   - Identify clues with incomplete solutions
//   - For each incomplete clue:
//       - Examine intersecting clues
//       - Determine all letters that could appear at each intersecting index
//       - Generate all possible combinations of those letters
//       - Convert each combination into a regex pattern
//       - Search the dictionary for matching candidate words
//       - If a valid candidate is found:
//           - Apply it to the clue
//           - Write the letters to the grid
//           - Propagate the updated letters to intersecting clues
//           - Attempt to resolve affected intersecting clues
//
// Used during crossword construction to progressively fill unresolved clues
// using constraints imposed by intersecting answers.
// used
// runs
export const resolveIncompleteClues = (clueList: Clue[], gridState: CellType[]) => {
	const clueListCopy = [...clueList];
	const gridStateCopy = [...gridState];
	// Get the clues that have incomplete answers
	const incompletes = getIncompleteAnswers(clueListCopy);

	// For each clue with an incomplete answer
	for (const incomplete of incompletes) {
		const allUniqueLetters = [];

		// Get clues that intersect with the Clue with incomplete answer
		const intersecting = getIntersectingClues(incomplete, clueListCopy);

		// For each clue that intersects with our Clue with incomplete answer
		for (const clue of intersecting) {
			// Preserve letters that intersect with clues other than the clue referenced by incomplete.id
			const resetAnswer = resetIntersectingClueLetters(clue, incomplete.id);
			// Create a pattern to match against candidate answers
			const pattern = createAnswerRegex(resetAnswer);
			// Get the candidate answers
			const wordList = getWordList(
				resetAnswer.length as AnswerLength,
				AllAnswers,
			);
			// Get candidate answers that match the Regex pattern
			const matches = getAllMatches(
				wordList,
				pattern,
				clue.solution.join(""),
				clueListCopy,
			);
			// Get the shared letter between intersecting clue and incomplete clue, includes index of letter in both clues
			const sharedLetter = getLetter(clue, incomplete);
			// Given available answers (matches), generate list of unique letters that could appear at a given index in a given clue
			const uniqueLetters = getUniqueIntersectingLetters(
				sharedLetter as SharedLetter,
				matches,
			);
			// Add uniqueLetters {index, letters[]} to allUniqueLetters array
			allUniqueLetters.push(uniqueLetters);
			// allUniqueLetters represents all letters that could appear at intersecting indices of a clue
		} // end of loop to generate allUniqueLetters
		if (allUniqueLetters.length > 1) {
			// Sort allUniqueLetters by ascending index
			allUniqueLetters.sort((a, b) => {
				return a?.index - b?.index;
			});
		}
		// Given allUniqueLetters, recursively generate all possible combinations of letters
		const allCombos = generateIntersectionLetterCombinations(allUniqueLetters);
		// at this point we've generated all letter combinations that might be used to find an answer for the incomplete clue

		// create the patterns
		const patterns: RegExp[] = [];
		for (const combo of allCombos) {
			const patternHolder = new Array(incomplete.solution.length).fill("");

			const indices = Array.from(
				allUniqueLetters,
				(unique) => unique.index as number,
			);

			// now iterate over each item in combo, and chuck it into patternHolder at the position?
			for (const [index, letter] of combo.entries()) {
				patternHolder[indices[index]] = letter;
			}
			// at this point patternHolder can be converted to a regexp and pushed to an array of patterns for matching
			patterns.push(createAnswerRegex(patternHolder) as RegExp);
		}
		const wordList = getWordList(incomplete.length as AnswerLength, AllAnswers);

		for (const pattern of patterns) {
			let finishLoop = false;
			// once we set a clue answer and update the intersecting clues, we need to break out of this loop
			const matchingWords = getAllMatches(
				wordList,
				pattern,
				incomplete.solution.join(""),
				clueListCopy,
			);

			if (matchingWords.length > 0) {
				finishLoop = true;
				// set the answer and break
				applyCandidateAnswerToClue(matchingWords, incomplete);
				writeClueToGrid(incomplete, gridStateCopy);

				// update intersecting clues
				const cluesToUpdate = propagateIntersectionLetters(incomplete, clueListCopy);
				// we will have to replace intersecting clue answers where the intersecting letter has been updated
				for (const clue of cluesToUpdate) {
					const resetAnswer = resetClueLetters(clue);
					const pattern = createAnswerRegex(resetAnswer);
					const wordList = getWordList(clue.length as AnswerLength, AllAnswers);
					const matches = getMatches(
						wordList,
						pattern,
						clue.solution.join(""),
						clueListCopy,
					);
					if (matches.length > 0) {
						// set the answer and break
						applyCandidateAnswerToClue(matches, clue);
						writeClueToGrid(clue, gridStateCopy);
					} else {
					}
				}
			}
			if (finishLoop) {
				break;
			}
		}
	} // end of loop iterating over a Clue with incomplete answer
	return { clues: clueListCopy, grid: gridStateCopy };
};


// Deselects all of the cells in the crossword grid.
// 
// Takes an array of `CellType` objects.
//
// Sets the `selected` prop to `false` for all `CellType` objects in the `grid`. 
// Mutates grid cells by clearing selection state.
//
// used
export const clearCellSelection = (grid: CellType[]) => {
	for (const gridItem of grid) {
		gridItem.selected = false;
	}
};

// Selects all grid cells that belong to the given clue.
//
// Takes the crossword `grid` and a `Clue`.
// Mutates the corresponding cells by setting `selected = true`.
// used
export const selectCellsForClue = (grid: CellType[], clue: Clue) => {
	for (const index of clue.indices) {
		grid[index].selected = true;
	}
};


// Propagates clue numbers from the grid cells to the corresponding Clue instances.
//
// Takes an array of `Clue` instances and an array of `CellType` objects.
// Mutates the `Clue` instances by setting their `clueNumber` property.
//
// Process:
//   - For each clue, take the first cell index in `clue.indices`
//   - Read the `clueNumber` from that cell in the grid
//   - Set the clue's `clueNumber` property accordingly
//
// Use case:
//   - During grid editing by the user
//   - During construction/reset of the puzzle when empty cells are removed
// used
export const updateClueNumbersFromGrid = (
	clueList: Clue[],
	gridState: CellType[],
) => {
	for (const clue of clueList) {
		const indexOfStartAnswer = clue.indices[0];

		const clueNum = gridState[indexOfStartAnswer].clueNumber;
		if (clueNum) clue.clueNumber = +clueNum;
	}
};


// Formats the word-length pattern for a clue's solution.
//
// Examples:
//   X-RAY   → "(1-3)"
//   ICE CREAM → "(3,5)"
//   CAT → "(3)"
//
// Takes a `Clue` and derives the lengths of its constituent words,
// preserving hyphens and commas where appropriate.
// used
export const formatAnswerLengths = (clue: Clue) => {
	
	const raw = clue.raw.join("");

	// Replace apostrophes
	const cleaned = raw.replace(/'/g, "");

	const parts = cleaned
		.split(" ") // split on space
		.map(word =>
			word
			.split("-") // split each word on hyphen
			.map( part => part.length) // map part to part length
			.join("-") // join lengths with hyphen
		)

	return `(${parts.join(",")})` // join with comma (indicating space)

};

// Returns the clues that contain the given cell.
// 
// Takes a 'CellType` and an array of `Clue` instances.
// 
// Returns an array of `Clue` instances containing 0-2 items inclusive.
// 
// Used during keyboard navigation to determine which clue should become active when a 
// cell is selected.
// used
export const getCluesContainingCell = (cell: CellType, clues: Clue[]) => {
	const cellId = cell.id; // index of the cell
	const containingClues = clues.filter((clue) => {
		return clue.indices.includes(cellId);
	});
	return containingClues;
};


// Persist applicaton state to local storage.
//
// Takes a `key` representing the application mode ("solve", "editor", or "puzzles")
// and a `Storage` object containing the current state.
//
// The stored structure varies depending on the key:
//	- "solver": grid, clues, and selection state
//	- "editor": grid, clues, and editor flags
//	- "puzzles": saved puzzle collection
//
//
export const saveStateToLocalStorage = (
	key: "solver" | "editor" | "puzzles",
	data: Storage,
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
			clueSelection: clueSelection ?? "",
			cellSelection,
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
	if(dataStore !== null){
	localStorage.setItem(key, JSON.stringify(dataStore));
}};


// Loads application state from localStorage.
//
// Takes a `key` identifying the stored state ("solver", "editor", or "puzzles").
// Returns the parsed state if it exists, otherwise returns null.
//
// Used
export const loadStateFromLocalStorage = (
	key: "solver" | "editor" | "puzzles",
): Storage | null => {
	
	const data = localStorage.getItem(key);
	
	if(!data){ 
		return null;
	}
	return JSON.parse(data) as Storage;
};



// Returns the cell diagonally up-right from the given index. 
//
// Takes the cell `index` and the `grid`.
//
// Returns  the adjacent cell if it exists, otherwise `undefined`.
//
//
// used in getAdjacentVoidIndices but that function is unused
export const getCellUpRight = (index: number, grid: CellType[]) => {
	// There is no up-right for a cell that is on the right side of the grid or on the top of the grid
	let cell: CellType | undefined;
	const width = Math.sqrt(grid.length)
	if (!isTopEdge(grid, index) && !isRightEdge(grid, index)) {
		cell = grid[index - width + 1];
	}
	return cell;
};


// Returns the cell diagonally down-right from the given index. 
//
// Takes the cell `index` and the `grid`.
//
// Returns  the adjacent cell if it exists, otherwise `undefined`.
//
//
// used grid validation (eg detecting contiguous blocks).
//
export const getCellDownRight = (index: number, grid: CellType[]) => {
	
	const width = Math.sqrt(grid.length);

	if (isBottomEdge(grid, index) || isRightEdge(grid, index)) {
		return undefined;
	}
	return grid[index + width  + 1];
};


// Returns the cell diagonally down-left from the given index. 
//
// Takes the cell `index` and the `grid`.
//
// Returns  the adjacent cell if it exists, otherwise `undefined`.
//
// Unused - used in getAdjacentVoidIndices but that function is unused
//
export const getCellDownLeft = (index: number, grid: CellType[]) => {
	
	const width = Math.sqrt(grid.length);

	if (isBottomEdge(grid, index) || isLeftEdge(grid, index)) {
		return undefined;
	}
	return grid[index + width - 1];
};

// Returns the cell diagonally up-left from the given index. 
//
// Takes the cell `index` and the `grid`.
//
// Returns  the adjacent cell if it exists, otherwise `undefined`.
//
// Unused - used in getAdjacentVoidIndices but that function is unused
//
export const getCellUpLeft = (index: number, grid: CellType[]) => {
	
	const width = Math.sqrt(grid.length);

	if (isTopEdge(grid, index) || isLeftEdge(grid, index)) {
		return undefined;
	}
	return grid[index - width - 1];
};


// Return indices of adjacent void (dark) cells in any direction for the cell with 
// the given index. 
//
// Takes a grid of CellType objcts and the index of a cell.
//
// Returns an array of numbers, each number being the index of an an adjacent void.
//
// Returns adjacent indices in all directions, including diagonals. Only includes immediate
// neighbours.
//
// Unused - could be used in a loop to help identify an invalid grid.
// A grid where there are contiguous voids between one side and another (including
// the same side) would be invalid - creates islands of unconnected entries. 
//
//
export const getAdjacentVoidIndices = (grid: CellType[], index: number) => {
	// Index will be the index of a cell where isVoid is true
	const cell = grid[index];
	// Store indices of adjacent voids
	const voids: number[] = [index];
	// Get the side width
	const width = Math.sqrt(grid.length);

	// cell left
	if (cell.left === false && !isLeftEdge(grid, index)) {
		voids.push(index - 1);
	}
	// cell up
	if (cell.top === false && !isTopEdge(grid, index)) {
		voids.push(index - width);
	}
	// cell right
	if (cell.right === false && !isRightEdge(grid, index)) {
		voids.push(index + 1);
	}
	// cell down
	if (cell.bottom === false && !isBottomEdge(grid, index)) {
		voids.push(index + width);
	}
	// upleft
	getCellUpLeft(index, grid)?.isVoid && voids.push(index - width - 1);
	// upright
	getCellUpRight(index, grid)?.isVoid && voids.push(index - width + 1);
	// downright
	getCellDownRight(index, grid)?.isVoid &&
		voids.push(index + width + 1);
	// downleft
	getCellDownLeft(index, grid)?.isVoid &&
		voids.push(index + width - 1);
	return voids;
};


// Returns the indices of all cells on the outer edges of the grid.
//
// Takes a grid of CellType objects.
//
// Combines the top, bottom, left, and right edges into a single
// de-duplicated array of indices.
//
// Returns an array of unique indices.
// unused
export const getAllEdgeCellIndices = (grid: CellType[]) => {

	const allEdges: number[] = [...findBottomEdge(grid), ...findLeftEdge(grid), ...findRightEdge(grid), ...findTopEdge(grid)];
	
	
	return Array.from(new Set(allEdges));
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
	let arraysCopy = [...arrays];

	function mergeTwoArrays(arr1: number[], arr2: number[]) {
		return [...new Set([...arr1, ...arr2])];
	}

	function hasCommonElements(arr1: number[], arr2: number[]) {
		return arr1.some((item) => arr2.includes(item));
	}

	// This array will store the result
	const result = [];

	while (arraysCopy.length > 0) {
		let first = arraysCopy[0];
		let rest = arraysCopy.slice(1); //copies array from pos 1 inclusive

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
		arraysCopy = rest; // rest and array now contains only unmerged arrays
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
	let valid = true;

	// reset isValid to true and backgroundColor to ""
	for (const cell of grid) {
		cell.isValid = true;
		cell.backgroundColor = "";
	}

	valid = findBlockOfCells(grid);

	const shortAnswers = clues.filter((clue) => clue.length < 3);
	const islandCell = grid.filter(
		(cell) =>
			!cell.isVoid && !cell.bottom && !cell.top && !cell.right && !cell.left,
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
			!cell.isVoid && !cell.bottom && !cell.top && !cell.right && !cell.left,
	);
	for (const cell of islandCell) {
		grid[cell.id].isVoid = true;
		grid[cell.id].solution = "";
		grid[cell.id].clueNumber = "";
		grid[cell.id].guess = "";
		updateSurroundingCells(grid, grid.length - 1 - cell.id);
	}
};

const findBlockOfCells = (grid: CellType[]) => {
	let isValid = true;
	for (let i = 0; i < grid.length; i++) {
		if (
			!grid[i].isVoid &&
			grid[i].right &&
			grid[i].bottom &&
			grid[i + 1].bottom
		) {
			grid[i].isValid = false;
			grid[i + 1].isValid = false;
			const cellBelow = getCellBelow(grid, i);
			const cellBelowRight = getCellDownRight(i, grid);
			if (cellBelow) cellBelow.isValid = false;
			if (cellBelowRight) cellBelowRight.isValid = false;
			isValid = false;
		}
	}
	return isValid;
};
