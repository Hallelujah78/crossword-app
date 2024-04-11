import { Direction } from "./Direction.model";

export type Clue = {
  length: number;
  direction: Direction;
  indices: number[];
  answer: string;
  clue: string;
};
