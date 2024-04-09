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
import findRightEdge from "../utils/utils";

const initializeGrid = (grid: CellType[]) => {
  return grid.map((item, index) => {
    item.id = index;
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
    console.log(targetIndex);
    // console.log((targetIndex + 1) % 13 === 0);
    console.log(findRightEdge(gridState));
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
  align-content: start;
  display: grid;
  width: 85vh;
  height: 85vh;
  border: red solid 1px;
  gap: 0;
`;
