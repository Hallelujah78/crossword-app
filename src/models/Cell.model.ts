export type CellType = {
  isVoid: boolean; // is the cell a void
  id: number; // index of the cell in the grid
  clueNumber?: string;
  top: boolean; // true if cell above is 
  right: boolean;
  bottom: boolean;
  left: boolean;
  letter?: string;
  selected: boolean;
  answer?: string;
  isValid?: boolean;
  backgroundColor?: string;
};
