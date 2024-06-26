export type CellType = {
  isVoid: boolean;
  id: number;
  clueNumber?: string;
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  letter?: string;
  selected: boolean;
  answer?: string;
  isValid?: boolean;
  backgroundColor?: string;
};
