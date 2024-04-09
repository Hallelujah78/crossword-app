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
  return grid.map((item, index) => {
    item.id = index;

    // is the square above a cell and not void?
    if (grid[index - Math.sqrt(grid.length)]?.isVoid) {
      item.top = false; // false indicates it is a void
    }
    // is the square to the right a cell and not a void?
    if (
      findRightEdge(grid).includes(index + 1) ||
      (!findRightEdge(grid).includes(index + 1) && grid[index + 1]?.isVoid)
    ) {
      item.right = false;
    }

    return item;
  });
};

const Grid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));

  const handleClick = (e: React.MouseEvent) => {
    if (!e.currentTarget.id) {
      return;
    }
    const targetIndex = +e.currentTarget.id;
    // testing only
    console.log(grid[targetIndex].right);
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
