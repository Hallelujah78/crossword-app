// unused functions from utils.ts go here

import type { CellType } from "../../models/Cell.model";
import { Direction } from "../../models/Direction.model";

// Returns all cells in the same row or column as the specified cell.
//
// Takes:
// - `index`: index of the reference cell in the grid
// - `direction`: Direction.ACROSS (row) or Direction.DOWN (column)
// - `grid`: array of CellType objects
//
// Returns an array of cells in the same row or column.
// 
export const getCellsInRowOrColumn = (
	index: number,
	direction: Direction.ACROSS | Direction.DOWN,
	grid: CellType[],
): CellType[] => {
	const cells: CellType[] = [];

	const width = Math.sqrt(grid.length);
	const row = Math.floor(index / width);
	const col = index % width;

	if (direction === Direction.ACROSS) {
		// get the column of cells
		for (let c = 0; c < width; c++) {
			cells.push(grid[row * width + c]);
		}
	} else {
		for (let r = 0; r < width; r++) {
			cells.push(grid[r * width + col]);
		}
	}
	return cells;
};


// Determine if either of the given arrays is a subset of the other.
//
// Takes two arrays.
//
// Return true if either of the given arrays is a subset of the other, otherwise return
// false.
//
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
		// return false early if a num in the array isn't in the set - can't be subset
		if (!mySet.has(num)) {
			return false;
		}
	}
	return true;
};
