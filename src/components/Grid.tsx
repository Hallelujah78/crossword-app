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
  getIncompleteAnswers,
  getIntersectingClues,
  resetIntersectClue,
  arrayToRegularExp,
  getWordList,
  AnswerLength,
  getMatches,
  getLetter,
  SharedLetter,
  getAllMatches,
  createUniqueLetterList,
} from "../utils/utils";
import { Direction } from "../models/Direction.model";
import Answer from "../models/Answer.model";

const Grid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));
  const [clueList, setClueList] = useState<Clue[]>([]);
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(false);

  useEffect(()=>{
    initializeApp(gridState, setClueList, setGridState)
  },[])

  const handleResetClue = ()=>{
    const incomplete = getIncompleteAnswers(clueList);
    console.log("first incomplete clue: ", incomplete[0])
    const intersecting = getIntersectingClues(incomplete[0], clueList);
    console.log("first clue that intersects the first incomplete clue: ", intersecting[0])

    const resetAnswer = resetIntersectClue(intersecting[0], incomplete[0].id);
    console.log("the reset answer: ", resetAnswer);
    const pattern = arrayToRegularExp(resetAnswer);
    console.log("the regexp pattern: ", pattern)
    const wordList = getWordList(resetAnswer.length as AnswerLength, AllAnswers);
    console.log("word list: ", wordList)
    const matches = getAllMatches(wordList, pattern, intersecting[0].answer.join(""), clueList);
    console.log("the matches: ", matches);
    // stick the letter at the intersection position into an array if it is not aleady in there
    const sharedLetter = getLetter(intersecting[0], incomplete[0]);

    
    const uniqueLetters = createUniqueLetterList(sharedLetter, matches);
    console.log("unique letters: ", uniqueLetters)

    // resetAnswer can be converted to a pattern we match against
    // then we want a unique letter in the position we intersect with the clue that has missing answers
    // for each matching answer we push the intersecting letter to an array if it is not already in the array
    // this array represents the group of letters that might appear at the shared position in our current incomplete answer
    // we repeat this for all intersecting clues
    // if an incomplete answer intersects with, say, 3 other clues, we will have 3 arrays of letters
    // we use combinations of these letters to create patterns that we can use to find a potential answer for our current incomplete answer
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!e.currentTarget.id) {
      return;
    }
    console.log(e.currentTarget.id)
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
          populateClues(clueList, AllAnswers, gridState, setGridState, setClueList, removeEmpty)
        }
      >
        Generate Answers
      </button>
      <br/>
      <label htmlFor="remove_blank">Remove Empty Cells</label>
        <input checked={removeEmpty} onChange={()=>setRemoveEmpty(prev => !prev)} type="checkbox" name="remove_blank" id="remove_blank" />
        <br/>
        <button
        onClick={() =>
          getIncompleteAnswers(clueList)
        }
      >
        Get Incomplete Answers
      </button>
      <br/>
        <button
        onClick={() =>
          getIntersectingClues(getIncompleteAnswers(clueList)[0], clueList)
        }
      >
        Get Intersecting Clues
      </button>
      <br/>
        <button
        onClick={() =>
          handleResetClue()
        }
      >
        Reset Clue
      </button>
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
