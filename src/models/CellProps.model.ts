import { CellType } from "./Cell.model";

export interface CellProps {
  cell: CellType;
  handleClick?: (e: React.MouseEvent) => void;
}
