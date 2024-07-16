import type { CellType } from "./Cell.model";
import type Clue from "../classes/Clue";
import type { Puzzles } from "./Puzzles.model";

export interface Storage {
  grid?: CellType[];
  clues?: Clue[];
  isModified?: boolean;
  clueSelection?: string;
  cellSelection?: CellType | undefined;
  puzzles?: Puzzles;
  warn?: boolean;
}
