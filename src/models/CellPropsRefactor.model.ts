import type { CellType } from "./Cell.model";

export interface CellPropsRefactor {
  cell: CellType;
  handleClick?: (e: React.MouseEvent) => void;
  handleCellClick?: (e: React.MouseEvent) => void;
  handleKeyDown?: (val: string) => void;
}
