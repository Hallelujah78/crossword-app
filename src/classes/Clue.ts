import type { Direction } from "../models/Direction.model";


export default class Clue {
  constructor(
    public clueNumber: number,
    public id: string,
    public length: number,
    public direction: Direction,
    public indices: number[],
    public answer: string[],
    public raw: string[],
    public clue: string,
    public intersection?: {
      id: string;
      myIndex: number;
      yourIndex: number;
      letter?: string;
    }[]
  ) {}
}
