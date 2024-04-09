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

const Grid: React.FC = () => {
  const [gridState, setGridState] = useState<CellType[]>(grid);

  const handleClick = (e: React.MouseEvent) => {
    if (!e.currentTarget.id) {
      return;
    }
    const targetIndex = +e.currentTarget.id;
    const symmetricalIndex = gridState.length - 1 - targetIndex;
    const tempGrid = JSON.parse(JSON.stringify(gridState)) as CellType[];

    tempGrid[targetIndex].isVoid = !tempGrid[targetIndex].isVoid;
    // need logic to handle if index is the center cell and if the index where we click is higher than the central cell (we need to add to 0) and change how we calculate the symmetrical index
    tempGrid[symmetricalIndex].isVoid = !tempGrid[symmetricalIndex].isVoid;

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
