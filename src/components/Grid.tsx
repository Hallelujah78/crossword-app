// react
import { useState } from "react";

// models
import { CellType } from "../models/Cell.model";

// libs
import styled from "styled-components";

// components
import Cell from "./Cell";

// data
import { grid } from "../data/grid";

// utils
import {
  findRightEdge,
  findLeftEdge,
  findTopEdge,
  findBottomEdge,
} from "../utils/utils";

const initializeGrid = (grid: CellType[]) => {
  const newGrid = grid.map((item, index) => {
    item.id = index;

    // is the square above a cell and not void?
    if (grid[index - Math.sqrt(grid.length)]?.isVoid) {
      item.top = false; // false indicates it is a void
    }
    // if the square to the right of the current square is a void OR the current square is on the right side of the grid (thus it has nothing to its right), then set the "right" property to false.
    if (
      findRightEdge(grid).includes(index) ||
      (!findRightEdge(grid).includes(index + 1) && grid[index + 1]?.isVoid)
    ) {
      item.right = false;
    }
    if (
      findTopEdge(grid).includes(index) ||
      (!findTopEdge(grid).includes(index) &&
        grid[index - Math.sqrt(grid.length)]?.isVoid)
    ) {
      item.top = false;
    }

    return item;
  }); // end of map
  newGrid.forEach((item, index) => {
    console.log(`To the top of ${index} is a letter: ${item.top}`);
  });
  return newGrid;
};

const Grid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));

  const handleClick = (e: React.MouseEvent) => {
    if (!e.currentTarget.id) {
      return;
    }
    const targetIndex = +e.currentTarget.id;
    // testing only
    console.log(grid[targetIndex + 1].isVoid);
    // testing only
    const symmetricalIndex = gridState.length - 1 - targetIndex;
    const tempGrid = JSON.parse(JSON.stringify(gridState)) as CellType[];

    // toggle the cell background
    tempGrid[targetIndex].isVoid = !tempGrid[targetIndex].isVoid;

    //
    if (targetIndex !== (tempGrid.length - 1) / 2) {
      tempGrid[symmetricalIndex].isVoid = !tempGrid[symmetricalIndex].isVoid;
    }

    setGridState(tempGrid);
  };

  const numberClues = () => {
    for (const cell of grid) {
      const index = cell.id;
      if (!cell.isVoid) {
        if (index && !grid[index + 1].isVoid) {
          console.log(`${index} is not void and is an across clue!`);
        }
      }
    }
  };

  return (
    <Wrapper>
      {gridState?.map((cell, index) => {
        return <Cell key={index} cell={cell} handleClick={handleClick} />;
      })}
      <button onClick={numberClues}>Clue Nums</button>
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
