import type { CellType } from "./Cell.model";

export interface CellProps {
  cell: CellType;
  handleClick?: (e: React.MouseEvent) => void;
  handleCellClick?: (e: React.MouseEvent) => void;
  handleKeyDown?: (val: string) => void;
  handleTabKeyPress?: (e: React.KeyboardEvent) => void;
}
