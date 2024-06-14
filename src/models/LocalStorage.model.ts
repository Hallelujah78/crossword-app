import type { CellType } from "./Cell.model";
import type Clue from "../classes/Clue";

export interface Storage {
  grid: CellType[];
  clues: Clue[];
  clueSelection: string;
  cellSelection: CellType;
  isModified: boolean;
}
