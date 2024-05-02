// react
import { useState, useEffect } from "react";

// models
import { CellType } from "../models/Cell.model";

import Clue from "../classes/Clue";

// libs
import styled from "styled-components";

// components
import Cell from "./Cell";

// data
import { grid } from "../data/grid";

import * as AllAnswers from "../data/answers2";

// utils
import {
  initializeGrid,
  setClueNumbers,
  updateSurroundingCells,
  createClues,
  populateClues,
  getAcrossClues,
  getDownClues,
  setCluesThatIntersect,
  sortCluesDescendingLength,
  initializeApp,
} from "../utils/utils";
import { Direction } from "../models/Direction.model";

const Grid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));
  const [clueList, setClueList] = useState<Clue[]>([]);
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(false);

  useEffect(()=>{
    initializeApp(gridState, setClueList, setGridState)
  },[])

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

    const clues = createClues(tempGrid);

    const acrossClues = getAcrossClues(clues);
    const downClues = getDownClues(clues);
    for (const clue of clues) {
      if (clue.direction === Direction.DOWN) {
        setCluesThatIntersect(clue, acrossClues);
      } else setCluesThatIntersect(clue, downClues);
    }
    sortCluesDescendingLength(clues);
    setClueList(clues);

    setGridState(tempGrid);
  };

  return (
    <Wrapper>
      {gridState?.map((cell, index) => {
        return <Cell key={index} cell={cell} handleClick={handleClick} />;
      })}
      <div className="control-container">
      <button
        onClick={() =>
          populateClues(clueList, AllAnswers, gridState, setGridState, setClueList)
        }
      >
        Generate Clues
      </button>
      <br/>
      <label htmlFor="remove_blank">Remove Empty Clues</label>
        <input checked={removeEmpty} onChange={()=>setRemoveEmpty(prev => !prev)} type="checkbox" name="remove_blank" id="remove_blank" />
      </div>
      
    </Wrapper>
  );
};
export default Grid;

const Wrapper = styled.div`
  grid-template-columns: repeat(13, 1fr);
  display: grid;
  width: auto;
  height: auto;
  .control-container {
    position: absolute;
    top: 3rem;
    left: 3rem;
    label{
      color: white;
    }
  }
`;
