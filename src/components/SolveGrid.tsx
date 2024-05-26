// react
import { useState } from "react";

// models

import Clue from "../classes/Clue";
import { Direction } from "../models/Direction.model";
import { CellType } from "../models/Cell.model";

// libs
import styled from "styled-components";

// components
import SolveCell from "./SolveCell";

// data
import { grid } from "../data/grid";

import * as AllAnswers from "../data/answers2";

// utils
import {
  initializeGrid,
  populateClues,
  initializeApp,
  resetAllAnswers,
  resetSelectedCells,
  setSelection,
} from "../utils/utils";

const SolveGrid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));
  const [clueList, setClueList] = useState<Clue[]>(() =>
    initializeApp(gridState)
  );
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(false);
  const [fillGrid, setFillGrid] = useState<boolean>(true);
  const [selectedClue, setSelectedClue] = useState<string>("");
  const [previousSelection, setPreviousSelection] = useState<CellType | null>(
    null
  );

  async function getClues() {
    const clues = [...clueList];
    type ReqClue = {
      id: string;
      word: string;
      clue: string;
    };
    const requestArray: ReqClue[] = [];

    clues.forEach((clue) => {
      const reqClue = { id: clue.id, word: clue.answer.join(""), clue: "" };
      requestArray.push(reqClue);
    });

    let apiURL = `/.netlify/functions/getClues`; // so we don't spam API

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: { accept: "application/json" },
        body: JSON.stringify(requestArray),
      });
      const data = (await response.json()) as ReqClue;

      // verify the data is as expected
      if (Array.isArray(data)) {
        clues.forEach((item) => {
          const id = item.id;
          const clueResp = data.find((clueObj) => {
            return clueObj?.id === id;
          });
          if (clueResp.clue && clueResp.clue !== "") {
            item.clue = clueResp.clue;
          } else {
            throw new Error(
              "The clues received from the AI are not in the correct format. Try generating the clues again!"
            );
          }
        });
        setClueList(clues);
      } else {
        throw new Error(
          "The clues received from the AI are not in the correct format. Try generating the clues again!"
        );
      }
    } catch (error) {
      alert(error);
    }
  }

  const generateClues = () => {
    const grid = [...gridState];
    const clues = [...clueList];

    let hasEmpty = grid.filter((cell) => {
      if (!cell.isVoid && !cell.letter) {
        return cell;
      }
    });
    if (!removeEmpty && hasEmpty.length > 0) {
      while (hasEmpty.length > 0) {
        resetAllAnswers(clueList, gridState, setGridState, setClueList);
        populateClues(
          clues,
          AllAnswers,
          grid,
          setGridState,
          setClueList,
          removeEmpty
        );
        const newGrid = [...gridState];
        hasEmpty = newGrid.filter((cell) => {
          if (!cell.isVoid && !cell.letter) {
            return cell;
          }
        });
      }
      return;
    }
    populateClues(
      clues,
      AllAnswers,
      grid,
      setGridState,
      setClueList,
      removeEmpty
    );
  };

  const handleCellClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement;
    let id: number;
    let clues = [...clueList];
    let grid = [...gridState];
    let currentClueSelection: Clue;
    let containingClues: Clue[];
    let cellItem: CellType | undefined;
    const prevClueSelection = clues.find((clue) => {
      if (selectedClue) {
        return clue.id === selectedClue;
      }
    });

    if (target && target.id) {
      id = +target.id;
      cellItem = grid.find((item) => {
        return id === item.id;
      })!;
      // **** testing only
      if (prevClueSelection && previousSelection) {
        console.log("prev selection cell: ", previousSelection.id);
        console.log("current cell id: ", cellItem.id);
      }
      // **** testing only
      console.log(cellItem);
      containingClues = clues.filter((clue) => {
        return clue.indices.includes(id);
      });
      console.log(containingClues);

      if (containingClues.length === 1) {
        resetSelectedCells(grid);

        currentClueSelection = containingClues[0];
        setPreviousSelection(cellItem);
        setSelection(grid, currentClueSelection);
        setSelectedClue(currentClueSelection.id);
        setGridState(grid);
      }

      if (containingClues.length === 2) {
        if (!selectedClue) {
          // there is no selection, so default to across
          resetSelectedCells(grid);
          const currentClueSelection = containingClues.find(
            (clue) => clue.direction === Direction.ACROSS
          );
          if (currentClueSelection) {
            setPreviousSelection(cellItem);
            setSelection(grid, currentClueSelection);
            setSelectedClue(currentClueSelection.id);
            setGridState(grid);
          }
        } else if (
          prevClueSelection &&
          previousSelection &&
          prevClueSelection?.indices.includes(cellItem.id) &&
          previousSelection.id !== cellItem.id
        ) {
          currentClueSelection = clues.find((clue) => {
            return clue.id === selectedClue;
          })!;
          resetSelectedCells(grid);
          setPreviousSelection(cellItem);
          setSelection(grid, currentClueSelection);
          setSelectedClue(currentClueSelection.id);
          setGridState(grid);
        } else {
          resetSelectedCells(grid);
          currentClueSelection = containingClues.find((clue) => {
            return selectedClue !== clue.id;
          })!;
          setPreviousSelection(cellItem);
          setSelection(grid, currentClueSelection);
          setSelectedClue(currentClueSelection.id);
          setGridState(grid);
        }
      }
    } else {
      return;
    }
  };

  return (
    <Wrapper>
      {gridState?.map((cell, index) => {
        return (
          <SolveCell
            key={index}
            cell={cell}
            handleCellClick={handleCellClick}
          />
        );
      })}
      <div className="control-container">
        <button onClick={() => generateClues()}>Generate Answers</button>
        <br />
        <label htmlFor="remove_blank">Remove Empty Cells</label>
        <input
          checked={removeEmpty}
          onChange={() => {
            setRemoveEmpty((prev) => !prev);
            setFillGrid((prev) => !prev);
          }}
          type="checkbox"
          name="remove_blank"
          id="remove_blank"
        />
        <br />
        <label htmlFor="fill_grid">Force Fill Grid</label>
        <input
          checked={fillGrid}
          onChange={() => {
            setRemoveEmpty((prev) => !prev);
            setFillGrid((prev) => !prev);
          }}
          type="checkbox"
          name="remove_blank"
          id="remove_blank"
        />
        <br />
        <button
          onClick={() =>
            resetAllAnswers(clueList, gridState, setGridState, setClueList)
          }
        >
          Reset Answers
        </button>
        <br />
        <button onClick={getClues}>AI Generate Clues!</button>
      </div>
    </Wrapper>
  );
};
export default SolveGrid;

const Wrapper = styled.div`
  grid-template-columns: repeat(13, 1fr);
  display: grid;
  width: auto;
  height: auto;
  .control-container {
    position: absolute;
    top: 2rem;
    left: -25vw;
    button,
    input,
    label {
      margin: 0.5rem;
    }
    label {
      color: white;
    }
  }
`;
