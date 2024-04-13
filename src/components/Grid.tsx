// react
import { useState } from "react";

// models
import { CellType } from "../models/Cell.model";
import Answer from "../models/Answer.model";

// libs
import styled from "styled-components";

// components
import Cell from "./Cell";

// data
import { grid } from "../data/grid";
import answers from "../data/answers";

// utils
import {
  initializeGrid,
  setClueNumbers,
  updateSurroundingCells,
  createClues,
  populateClues,
} from "../utils/utils";

const Grid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));

  const handleClick = (e: React.MouseEvent) => {
    if (!e.currentTarget.id) {
      return;
    }
    const targetIndex = +e.currentTarget.id;

    const symmetricalIndex = gridState.length - 1 - targetIndex;
    const tempGrid = JSON.parse(JSON.stringify(gridState)) as CellType[];

    // toggle the cell background
    tempGrid[targetIndex].isVoid = !tempGrid[targetIndex].isVoid;
    // update the top, bottom, left and right props of surrounding cells
    updateSurroundingCells(tempGrid, targetIndex);

    //
    if (targetIndex !== (tempGrid.length - 1) / 2) {
      tempGrid[symmetricalIndex].isVoid = !tempGrid[symmetricalIndex].isVoid;
      // update the top, bottom, left and right props of surrounding cells
      updateSurroundingCells(tempGrid, symmetricalIndex);
    }
    setClueNumbers(tempGrid);
    console.log(tempGrid);
    const clues = createClues(tempGrid);
    console.log(clues);
    console.log(answers[populateClues(clues, answers)].raw);

    setGridState(tempGrid);
  };

  return (
    <Wrapper>
      {gridState?.map((cell, index) => {
        return <Cell key={index} cell={cell} handleClick={handleClick} />;
      })}
    </Wrapper>
  );
};
export default Grid;

const Wrapper = styled.div`
  grid-template-columns: repeat(13, 1fr);
  display: grid;
  width: auto;
  height: auto;
  button {
    position: absolute;
    top: 3rem;
    left: 3rem;
  }
`;
