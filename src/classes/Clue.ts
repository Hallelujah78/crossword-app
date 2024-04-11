import { Direction } from "../models/Direction.model";

export default class Clue {
  constructor(
    public length: number,
    public direction: Direction,
    public indices: number[],
    public answer: string,
    public clue: string
  ) {}
}
