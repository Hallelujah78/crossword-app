// react
import { useState, useEffect, useRef } from "react";

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
  getWordLength,
} from "../utils/utils";

const SolveGrid: React.FC = () => {
  const [gridState, setGridState] = useState(() => initializeGrid(grid));
  const [clueList, setClueList] = useState<Clue[]>(() =>
    initializeApp(gridState)
  );
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(false);
  const [fillGrid, setFillGrid] = useState<boolean>(true);
  const [selectedClue, setSelectedClue] = useState<string>("");
  const [selectedCell, setSelectedCell] = useState<CellType | null>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.addEventListener("keydown", handleTabPress);
    return () => {
      document.removeEventListener("keydown", handleTabPress);
    };
  });

  const handleTabPress = (event: KeyboardEvent) => {
    if (selectedClue === "") {
      return;
    }
    event.preventDefault();
    const currentSelectedClue = selectedClue;
    const clues = [...clueList];
    const grid = [...gridState];
    clues.sort((a, b) => {
      return a.clueNumber - b.clueNumber;
    });
    clues.sort((a, b) => {
      return a.direction - b.direction;
    });
    console.log(clues);
    let index = clues.findIndex(
      (clue: Clue) => clue.id === currentSelectedClue
    );
    if (selectedClue !== "" && event.key === "Tab" && !event.shiftKey) {
      if (index === clues.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
    }
    if (selectedClue !== "" && event.key === "Tab" && event.shiftKey) {
      if (index === 0) {
        index = clues.length - 1;
      } else {
        index = index - 1;
      }
    }
    const focusCell = clues[index].indices[0];
    // get the first element of the indices prop of the selected clue
    cellRefs!.current[focusCell]!.focus(); // this works
    resetSelectedCells(grid);
    setSelection(grid, clues[index]);
    setSelectedClue(clues[index].id);
  };

  const renderClues = (clueList: Clue[], direction: Direction) => {
    const clues = [...clueList];
    clues.sort((a, b) => {
      return a.clueNumber - b.clueNumber;
    });
    const cluesToRender = clues.filter((clue) => {
      return clue.direction === direction;
    });
    return cluesToRender.map((clue) => {
      const isSelected = clue.id === selectedClue;
      return (
        <li
          style={{
            background: isSelected ? "#fff7b2" : "#1c1d1f",
            color: isSelected ? "black" : "darkgray",
          }}
          key={clue.id}
        >
          <span>{clue.clueNumber}</span>{" "}
          <div>
            {clue.clue} <span>{getWordLength(clue)}</span>
          </div>
        </li>
      );
    });
  };

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
      if (prevClueSelection && selectedCell) {
        console.log("prev selection cell: ", selectedCell.id);
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
        setSelectedCell(cellItem);
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
            setSelectedCell(cellItem);
            setSelection(grid, currentClueSelection);
            setSelectedClue(currentClueSelection.id);
            setGridState(grid);
          }
        } else if (
          prevClueSelection &&
          selectedCell &&
          prevClueSelection?.indices.includes(cellItem.id) &&
          selectedCell.id !== cellItem.id
        ) {
          currentClueSelection = clues.find((clue) => {
            return clue.id === selectedClue;
          })!;
          resetSelectedCells(grid);
          setSelectedCell(cellItem);
          setSelection(grid, currentClueSelection);
          setSelectedClue(currentClueSelection.id);
          setGridState(grid);
        } else {
          resetSelectedCells(grid);
          currentClueSelection = containingClues.find((clue) => {
            return selectedClue !== clue.id;
          })!;
          setSelectedCell(cellItem);
          setSelection(grid, currentClueSelection);
          setSelectedClue(currentClueSelection.id);
          setGridState(grid);
        }
      }
    } else {
      return;
    }
  };
  // *******************************
  // *******************************
  // JSX below here
  // *******************************
  // *******************************
  // *******************************
  return (
    <Wrapper>
      {gridState?.map((cell, index) => {
        return (
          <SolveCell
            key={index}
            cell={cell}
            handleCellClick={handleCellClick}
            ref={(el) => {
              cellRefs.current[index] = el;
            }}
          />
        );
      })}
      <div className="clue-container">
        <div className="across">
          <h2>Across</h2>
          <ul>{renderClues(clueList, Direction.ACROSS)}</ul>
        </div>
        <div className="down"></div>
        <h2>Down</h2>
        <ul>
          <ul>{renderClues(clueList, Direction.DOWN)}</ul>
        </ul>
      </div>
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
  position: relative;
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
  .clue-container {
    margin-top: -4rem;
    h2 {
      border-bottom: 1px rgba(80, 80, 80, 0.8) solid;
      font-size: 1.25rem;
      font-weight: 700;
      color: #a9dfff;
      height: 1.75rem;
      margin-top: 2.5rem;
    }
    left: 42vw;
    position: absolute;
    width: 25vw;
    color: #d1d0ce;
    li {
      border-radius: 0.2rem;
      margin: 0.5rem 0 0.5rem 0;
      padding: 0 0.9rem 0 0.9rem;
      color: darkgray;
      display: flex;
      justify-content: space-between;
    }
  }
`;
