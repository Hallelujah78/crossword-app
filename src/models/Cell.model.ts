
export type CellType = {
  isVoid: boolean; // is the cell a void
  id: number; // index of the cell in the grid
  clueNumber?: string; // the number displayed in top-left corner of the cell for a clue
  top: boolean; // true if cell above is light, false otherwise 
  right: boolean; // true if cell to right is light, false otherwise
  bottom: boolean; // true if cell below is light, false otherwise
  left: boolean; // true if cell to left is light, false otherwise
  letter?: string; // the correct letter that should be at this location
  selected: boolean; // true if selected, false otherwise
  answer?: string; // the letter the user has input for the cell (if any)
  isValid?: boolean; // false if the cell makes the grid invalid
  backgroundColor?: string; // used to indicate invalid grid state
};
