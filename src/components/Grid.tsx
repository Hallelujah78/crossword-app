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
    const symmetricalIndex = gridState.length - 1 - targetIndex;
    const tempGrid = JSON.parse(JSON.stringify(gridState)) as CellType[];

    tempGrid[targetIndex].isVoid = !tempGrid[targetIndex].isVoid;
    // need logic to handle if index is the center cell

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
