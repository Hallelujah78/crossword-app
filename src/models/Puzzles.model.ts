import type Clue from "../classes/Clue";
import type { CellType } from "./Cell.model";

export type Puzzle = { name: string; grid: CellType[]; clues: Clue[] };
export type Puzzles = Puzzle[];
