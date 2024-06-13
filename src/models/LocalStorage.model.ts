import type { CellType } from "./Cell.model";
import type Clue from "../classes/Clue";

export interface Solver {
  solver: {
    grid: CellType[];
    clues: Clue[];
    clueSelection: string;
    cellSelection: CellType;
  };
}

export interface Editor {
  editor: {
    grid: CellType[];
    clues: Clue[];
    isModified: boolean;
  };
}
export interface Puzzles {
  puzzles: {
    grid: CellType[];
    clues: Clue[];
    isModified: boolean;
  };
}

export interface Storage {
  grid: CellType[];
  clues: Clue[];
  clueSelection: string;
  cellSelection: CellType;
  isModified: boolean;
}
