import { ChangeEvent } from "react";
import { CellType } from "./Cell.model";

export interface CellProps {
  cell: CellType;
  handleClick?: (e: React.MouseEvent) => void;
  handleCellClick?: (e: React.MouseEvent) => void;
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
