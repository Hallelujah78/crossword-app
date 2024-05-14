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
  getLetter,
  getAllMatches,
  createUniqueLetterList,
  generateCombinations,
} from "../utils/utils";
import { Direction } from "../models/Direction.model";


const Grid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));
  const [clueList, setClueList] = useState<Clue[]>([]);
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(false);

  useEffect(()=>{
    initializeApp(gridState, setClueList, setGridState)
  },[])

  const handleResetClue = ()=>{
    const allUniqueLetters = [];
    const incomplete = getIncompleteAnswers(clueList);
    console.log("first incomplete clue: ", incomplete[0])
    const intersecting = getIntersectingClues(incomplete[0], clueList);
    console.log("first clue that intersects the first incomplete clue: ", intersecting[0])


    for(const clue of intersecting){
      const resetAnswer = resetIntersectClue(clue, incomplete[0].id);
    console.log("the reset answer: ", resetAnswer);
      const pattern = arrayToRegularExp(resetAnswer);
    console.log("the regexp pattern: ", pattern)
    const wordList = getWordList(resetAnswer.length as AnswerLength, AllAnswers);
    console.log("word list: ", wordList)
    const matches = getAllMatches(wordList, pattern, clue.answer.join(""), clueList);
    console.log("the matches: ", matches);
    const sharedLetter = getLetter(clue, incomplete[0]);
    const uniqueLetters = createUniqueLetterList(sharedLetter, matches);
    console.log("unique letters: ", uniqueLetters)
    allUniqueLetters.push(uniqueLetters)
    }
    allUniqueLetters.sort((a, b)=>{
      if(a && a.index !== undefined && typeof a.index === 'number' && b && b.index !== undefined){
      return a.index - b.index
      }
    })
    console.log("all uniques: ", allUniqueLetters)
    const allCombos = generateCombinations(allUniqueLetters)
    // const allCombos = generateCombinationsWithEmptySpace(allUniqueLetters)
    console.log("allCombos: ", allCombos)
   // at this point we've generated all letter combinations that might be used to find an answer for the clue at incomplete[0]

   // create the patterns
   for(const combo of allCombos){
    let patternHolder = new Array(incomplete[0].answer.length).fill("");
    
    // console.log("the patt holder: ", patternHolder);
    const indices = Array.from(allUniqueLetters, (unique)=> unique.index)
    // console.log("the indices", indices)

    // now iterate over each item in combo, and chuck it into patternHolder at the position?
    for(const [index, letter] of combo.entries()){
      patternHolder[indices[index]] = letter;
    }
   // at this point patternHolder can be converted to a regexp and pushed to an array of patterns for matching
  }
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
