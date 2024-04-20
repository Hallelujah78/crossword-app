import { Direction } from "../models/Direction.model";

export default class Clue {
  constructor(
    public id: string,
    public length: number,
    public direction: Direction,
    public indices: number[],
    public answer: string[],
    public clue: string,
    public intersection?: {
      id: string;
      myIndex: number;
      yourIndex: number;
      letter?: string;
    }[]
  ) {}
}
