// react
import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";

// models
import type Clue from "../classes/Clue";
import { Direction } from "../models/Direction.model";
import type { CellType } from "../models/Cell.model";

// libs
import styled from "styled-components";

// components
import SolveCell from "./SolveCell";
import ErrorPage from "./ErrorPage";

// data
import { initialGrid } from "../state/grid";

import * as AllAnswers from "../state/answers2";

// utils
import {
  initializeGrid,
  populateClues,
  initializeApp,
  resetAllAnswers,
  resetSelectedCells,
  setSelection,
  getWordLength,
  getCellBelow,
  getCellAbove,
  isLeftEdge,
  isRightEdge,
  getCluesFromCell,
  getLocalStorage,
  setLocalStorage,
} from "../utils/utils";
import type { Puzzle, Puzzles } from "../models/Puzzles.model";
import Loading from "./Loading";
import PoweredBy from "./PoweredBy";

const SolveGrid: React.FC = () => {
  const [gridState, setGridState] = useState<CellType[]>(() =>
    localStorage.getItem("solver")
      ? getLocalStorage("solver")?.grid
      : initializeGrid(JSON.parse(JSON.stringify(initialGrid)))
  );
  const [clueList, setClueList] = useState<Clue[]>(() =>
    localStorage.getItem("solver")
      ? getLocalStorage("solver")?.clues
      : initializeApp(gridState)
  );
  const [removeEmpty, _setRemoveEmpty] = useState<boolean>(false);

  const [selectedClue, setSelectedClue] = useState<string>(() =>
    localStorage.getItem("solver")
      ? getLocalStorage("solver")?.clueSelection
      : ""
  );
  const [puzzles, _setPuzzles] = useState<Storage | Puzzles>(() =>
    localStorage.getItem("puzzles")
      ? (getLocalStorage("puzzles") as Puzzles)
      : []
  );
  const [selectedPuzzle, setSelectedPuzzle] = useState<string>("-");
  const [selectedCell, setSelectedCell] = useState<CellType | undefined>(() =>
    localStorage.getItem("solver")
      ? getLocalStorage("solver")?.cellSelection
      : undefined
  );
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setLocalStorage("solver", {
      grid: gridState,
      clues: clueList,
      clueSelection: selectedClue,
      cellSelection: selectedCell,
    });
  }, [gridState, clueList, selectedClue, selectedCell]);

  const handleSelectChange = (e) => {
    const tempPuzzles = JSON.parse(JSON.stringify(puzzles));
    const selectedVal = e.target.value;
    if (e.target?.value === "-" || e.target.id === "reset-all") {
      // reset the state
      setSelectedCell(undefined);
      setSelectedClue("");
      console.log("the grid when - selected: ", initialGrid);
      const resetGrid = initializeGrid(JSON.parse(JSON.stringify(initialGrid)));
      console.log("initialized grid: ", resetGrid);

      const clues = initializeApp(resetGrid);
      setGridState(resetGrid);
      setClueList(clues);
      setSelectedPuzzle("-");
      return;
    }

    let puzzleSelection: Puzzle;
    if (tempPuzzles.length > 0) {
      puzzleSelection = tempPuzzles.find(
        (puzzle: Puzzle) => puzzle.name === selectedVal
      );
      setSelectedCell(undefined);
      setSelectedClue("");
      setSelectedPuzzle(selectedVal);
      setGridState(puzzleSelection?.grid);
      setClueList(puzzleSelection?.clues);
    }
  };

  const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    const grid = [...gridState];
    const clues = [...clueList];
    const currSelectedClue = clues.find((clue) => clue.id === selectedClue);
    if (id === "check-single") {
      if (!currSelectedClue) {
        return;
      }
      for (const index of currSelectedClue.indices) {
        const cell = grid[index];
        if (cell.answer !== cell.letter) {
          cell.answer = "";
        }
      }
      setGridState(grid);
    }
    if (id === "reveal-single") {
      if (!currSelectedClue) {
        return;
      }
      for (const index of currSelectedClue.indices) {
        const cell = grid[index];
        cell.answer = cell.letter;
      }
      setGridState(grid);
    }
    if (id === "clear-single") {
      if (!currSelectedClue) {
        return;
      }
      for (const index of currSelectedClue.indices) {
        const cell = grid[index];
        cell.answer = "";
      }
      setGridState(grid);
    }
    if (id === "check-all") {
      for (const clue of clues) {
        for (const index of clue.indices) {
          const cell = grid[index];
          if (cell.answer !== cell.letter) {
            cell.answer = "";
          }
        }
      }
      setGridState(grid);
    }
    if (id === "reveal-all") {
      for (const clue of clues) {
        for (const index of clue.indices) {
          const cell = grid[index];
          cell.answer = cell.letter;
        }
      }
      setGridState(grid);
    }
    if (id === "clear-all") {
      for (const clue of clues) {
        for (const index of clue.indices) {
          const cell = grid[index];
          cell.answer = "";
        }
      }
      setGridState(grid);
    }
  };

  const handleAlpha = (e: KeyboardEvent) => {
    const clues = [...clueList];
    const grid = [...gridState];
    const currSelectedClue = clues.find((clue) => clue.id === selectedClue);
    let targetCell: CellType | undefined = selectedCell
      ? { ...selectedCell, answer: e.key }
      : undefined;

    if (currSelectedClue && currSelectedClue.direction === 1 && selectedCell) {
      if (selectedCell.bottom) {
        targetCell = getCellBelow(grid, selectedCell.id);
        if (targetCell) {
          cellRefs.current[targetCell?.id]?.focus();
        }
      }
    }
    if (currSelectedClue && currSelectedClue.direction === 0 && selectedCell) {
      if (!isRightEdge(grid, selectedCell.id) && selectedCell.right) {
        targetCell = grid[selectedCell.id + 1];
        if (targetCell) {
          cellRefs.current[targetCell.id]?.focus();
        }
      }
    }
    const updatedGrid = grid.map((gridItem) =>
      gridItem.id === selectedCell?.id
        ? { ...gridItem, answer: e.key.toUpperCase() }
        : gridItem
    );
    setSelectedCell(targetCell);
    setGridState(updatedGrid);
  };

  const handleClueClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const grid = JSON.parse(JSON.stringify(gridState));
    const clues = JSON.parse(JSON.stringify(clueList));
    const target = e.currentTarget;
    const currSelectedClue = clues.find((clue: Clue) => clue.id === target.id);
    console.log("the target: ", target.id);
    console.log("the currSelected: ", currSelectedClue);
    if (target && currSelectedClue) {
      resetSelectedCells(grid);
      setSelection(grid, currSelectedClue);
      setSelectedCell(grid[currSelectedClue.indices[0]]);
      cellRefs.current[currSelectedClue.indices[0]]?.focus();
      setSelectedClue(currSelectedClue.id);
      setGridState(grid);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      handleDelete(e);
    }
    if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(e.key.toUpperCase())) {
      handleAlpha(e);
    }
    if (e.key === "Tab") {
      handleTabPress(e);
    }
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      handleArrowKeyPress(e);
    }
  };

  const handleDelete = (e: KeyboardEvent) => {
    if (!selectedCell) {
      return;
    }
    e.preventDefault();
    const grid = [...gridState];
    const clues = [...clueList];

    // if cell has answer, set answer to ""
    if (selectedCell.answer) {
      selectedCell.answer = "";
      setSelectedCell((prev) => prev);
      const updatedGrid = grid.map((gridItem) =>
        gridItem.id === selectedCell.id ? { ...gridItem, answer: "" } : gridItem
      );
      setGridState(updatedGrid);
    } else {
      // if cell has no answer, set focus to previous cell (if there is one)
      const currSelectedClue = clues.find((clue) => clue.id === selectedClue);

      // 0 is across and 1 is down
      let targetCell: CellType | undefined;
      if (currSelectedClue?.direction === 1 && selectedCell) {
        if (selectedCell.top) {
          targetCell = getCellAbove(grid, selectedCell.id);
          setSelectedCell(targetCell);
          if (targetCell) {
            cellRefs.current[targetCell.id]?.focus();
          }
        }
      }
      if (currSelectedClue?.direction === 0 && selectedCell) {
        if (!isLeftEdge(grid, selectedCell.id) && selectedCell.left) {
          targetCell = grid[selectedCell.id - 1];
          setSelectedCell(targetCell);
          if (targetCell) {
            cellRefs.current[targetCell.id]?.focus();
          }
        }
      }
    }
  };

  const handleTabPress = (event: KeyboardEvent) => {
    if (selectedClue === "" || event.key !== "Tab") {
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
    const newSelectedCell = grid[focusCell];
    // get the first element of the indices prop of the selected clue
    cellRefs.current[focusCell]?.focus(); // this works
    resetSelectedCells(grid);
    setSelection(grid, clues[index]);
    setSelectedClue(clues[index].id);
    setSelectedCell(newSelectedCell);
  };

  const handleArrowKeyPress = (event: KeyboardEvent) => {
    if (
      !selectedCell ||
      (event.key !== "ArrowDown" &&
        event.key !== "ArrowUp" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight")
    ) {
      return;
    }
    const clues = [...clueList];
    const grid = [...gridState];
    const currentSelectedClue = clues.find((clue) => {
      return clue.id === selectedClue;
    });
    const cellId = selectedCell.id; // number
    let targetCell: CellType | undefined = undefined;

    if (event.key === "ArrowDown") {
      targetCell = getCellBelow(grid, cellId);
    }
    if (event.key === "ArrowUp") {
      targetCell = getCellAbove(grid, cellId);
    }
    if (event.key === "ArrowLeft" && !isLeftEdge(grid, cellId)) {
      targetCell = grid[cellId - 1];
    }
    if (event.key === "ArrowRight" && !isRightEdge(grid, cellId)) {
      targetCell = grid[cellId + 1];
    }
    if (targetCell && !targetCell.isVoid) {
      cellRefs.current[targetCell.id]?.focus();

      if (!currentSelectedClue?.indices.includes(targetCell.id)) {
        const myClues = getCluesFromCell(targetCell, clues);
        const index = clues.findIndex(
          (clue: Clue) => clue.id === myClues[0].id
        );
        resetSelectedCells(grid);
        setSelectedClue(clues[index].id);
        setSelection(grid, clues[index]);
      }

      setSelectedCell(targetCell);
    }
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
        <div
          className="clue-item"
          id={clue.id}
          onClick={(e) => handleClueClick(e)}
          onKeyDown={() => {}}
          style={{
            background: isSelected ? "#fff7b2" : "#1c1d1f",
            color: isSelected ? "black" : "darkgray",
          }}
          key={clue.id}
        >
          <div className="clue-number">
            <p>{clue.clueNumber}</p>
          </div>

          <div className="clue-text">
            <p>
              {clue.clue} <span>{getWordLength(clue)}</span>
            </p>
          </div>
        </div>
      );
    });
  };

  const renderSelectedClue = () => {
    const currSelectedClue = clueList.find((clue) => clue.id === selectedClue);

    if (currSelectedClue?.clue) {
      return (
        <>
          <div>
            <p className="clue-number">
              {currSelectedClue.clueNumber +
                (currSelectedClue.direction === 1 ? "D" : "A")}
            </p>
          </div>

          <div>
            <p className="clue-text">{currSelectedClue.clue}</p>
          </div>
          <div>
            <p>
              <p className="answer-length">{getWordLength(currSelectedClue)}</p>
            </p>
          </div>
        </>
      );
    }
  };

  async function getClues(clues: Clue[]) {
    type ReqClue = {
      id: string;
      word: string;
      clue: string;
    };
    setIsLoading(true);
    const requestArray: ReqClue[] = [];

    for (const clue of clues) {
      const reqClue = { id: clue.id, word: clue.answer.join(""), clue: "" };
      requestArray.push(reqClue);
    }

    const apiURL = "/.netlify/functions/getClues";

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: { accept: "application/json" },
        body: JSON.stringify(requestArray),
      });

      if (!response.ok && response.status === 500 && !response.bodyUsed) {
        throw new Error(
          `${response.status}: ${response.statusText}. This may indicate that the request took longer than 10 seconds and timed out. This is not uncommon with OpenAI API requests. Please try again!`
        );
      }

      const data = await response.json();

      console.log("the data after response.json(): ", data);
      console.log("the raw response: ", response);

      if (response.ok) {
        for (const clue of clues) {
          const id = clue.id;
          const clueResp = data.find((clueObj) => {
            return clueObj?.id === id;
          });
          if (clueResp.clue && clueResp.clue !== "") {
            clue.clue = clueResp.clue;
          } else {
            throw new Error(
              "The clues received from the AI are not in the correct format. Try generating the clues again!"
            );
          }
        }
        console.log(
          "these are the clues with the response from the server filled in: ",
          clues
        );
        setClueList(clues);
      } else {
        // response is not okay, and we already know that there's a body and the status is not 500 => we can use the response's body to provide information to the user
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }

  const generateAnswers = (grid: CellType[], clues: Clue[]) => {
    let hasEmpty = grid.filter((cell) => {
      if (!cell.isVoid && !cell.letter) {
        return cell;
      }
    });
    if (!removeEmpty && hasEmpty.length > 0) {
      while (hasEmpty.length > 0) {
        const { grid: resetGrid, clues: resetClues } = resetAllAnswers(
          clues,
          grid
        );
        populateClues(
          resetClues,
          AllAnswers,
          resetGrid,
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
    const clues = [...clueList];
    const grid = [...gridState];
    let currentClueSelection: Clue;
    let containingClues: Clue[];
    let cellItem: CellType | undefined;
    const prevClueSelection = clues.find((clue) => {
      if (selectedClue) {
        return clue.id === selectedClue;
      }
    });

    if (target?.id) {
      id = +target.id;
      cellItem = grid.find((item) => {
        return id === item.id;
      });

      containingClues = clues.filter((clue) => {
        return clue.indices.includes(id);
      });

      if (containingClues.length === 1) {
        resetSelectedCells(grid);

        currentClueSelection = containingClues[0];
        setSelectedCell(cellItem);
        setSelection(grid, currentClueSelection);
        setSelectedClue(currentClueSelection.id);
        setGridState(grid);
      }

      if (containingClues.length === 2) {
        let currentClueSelection: Clue | undefined;
        if (!selectedClue) {
          // there is no selection, so default to across
          resetSelectedCells(grid);
          currentClueSelection = containingClues.find(
            (clue) => clue.direction === Direction.ACROSS
          );
          if (currentClueSelection) {
            setSelectedCell(cellItem);
            setSelection(grid, currentClueSelection);
            setSelectedClue(currentClueSelection.id);
            setGridState(grid);
          }
        } else if (
          typeof cellItem?.id === "number" &&
          prevClueSelection &&
          selectedCell &&
          prevClueSelection?.indices.includes(cellItem.id) &&
          selectedCell.id !== cellItem?.id
        ) {
          currentClueSelection = clues.find((clue) => {
            return clue.id === selectedClue;
          });
          resetSelectedCells(grid);
          setSelectedCell(cellItem);
          if (currentClueSelection) {
            setSelection(grid, currentClueSelection);
            setSelectedClue(currentClueSelection.id);
          }

          setGridState(grid);
        } else {
          resetSelectedCells(grid);
          currentClueSelection = containingClues.find((clue) => {
            return selectedClue !== clue.id;
          });
          setSelectedCell(cellItem);
          if (currentClueSelection) {
            setSelection(grid, currentClueSelection);
            setSelectedClue(currentClueSelection.id);
          }
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
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <Wrapper>
      <PoweredBy />
      <div className="control-container">
        <label htmlFor="puzzles">Select Puzzle</label>
        <select
          onChange={(e) => handleSelectChange(e)}
          name="puzzles"
          id="puzzles"
          value={selectedPuzzle}
        >
          <option value="-">-</option>
          {puzzles?.map((puzzle: Puzzle, index: number) => {
            return (
              <option key={`${puzzle.name}${index}`} value={puzzle.name}>
                {puzzle.name}
              </option>
            );
          })}
        </select>
        <br />
        <button
          type="button"
          onClick={() => {
            setSelectedPuzzle("-");
            const { grid: resetGrid, clues: resetClues } = resetAllAnswers(
              clueList,
              gridState
            );
            generateAnswers(resetGrid, resetClues);
            setSelectedCell(undefined);
            setSelectedClue("");
            getClues(resetClues);
          }}
        >
          New Puzzle
        </button>
        <br />
      </div>

      {<div className="selected-clue">{renderSelectedClue()}</div>}
      <div className="grid-button-container">
        <div className="grid-container">
          {gridState?.map((cell: CellType, index: number) => {
            return (
              <SolveCell
                handleKeyDown={handleKeyDown}
                key={cell.id}
                cell={cell}
                handleCellClick={handleCellClick}
                ref={(el) => {
                  cellRefs.current[index] = el;
                }}
              />
            );
          })}
        </div>

        <div className="button-container">
          <div className="single-clue">
            <button
              type="button"
              id="check-single"
              disabled={!selectedClue}
              onClick={(e) => {
                checkAnswers(e);
              }}
            >
              Check This
            </button>
            <button
              type="button"
              id="reveal-single"
              disabled={!selectedClue}
              onClick={(e) => {
                checkAnswers(e);
              }}
            >
              Reveal This
            </button>
            <button
              type="button"
              id="clear-single"
              disabled={!selectedClue}
              onClick={(e) => {
                checkAnswers(e);
              }}
            >
              Clear This
            </button>
          </div>
          <div className="all-clues">
            <button
              disabled={clueList[0].answer.includes("")}
              type="button"
              id="check-all"
              onClick={(e) => {
                checkAnswers(e);
              }}
            >
              Check All
            </button>
            <button
              disabled={clueList[0].answer.includes("")}
              type="button"
              id="reveal-all"
              onClick={(e) => {
                checkAnswers(e);
              }}
            >
              Reveal All
            </button>
            <button
              disabled={clueList[0].answer.includes("")}
              type="button"
              id="clear-all"
              onClick={(e) => {
                checkAnswers(e);
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
      {clueList[0].clue === "" ? (
        <div className="no-clues">
          <p>
            Clues are displayed here. Select a puzzle from the dropdown or
            create a new random puzzle to show clues!
          </p>
        </div>
      ) : (
        <div className="clue-container">
          <div className="across">
            <h2>Across</h2>
            <ul>{renderClues(clueList, Direction.ACROSS)}</ul>
          </div>
          <div className="down">
            <h2>Down</h2>
            <ul>
              <ul>{renderClues(clueList, Direction.DOWN)}</ul>
            </ul>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default SolveGrid;

// *******************************
// *******************************
// STYLED COMPONENT below here
// *******************************
// *******************************
// *******************************

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: calc(100vh - var(--nav-height));
  display: grid;
  grid-template-columns: 0.8fr 2fr 2fr;
  .grid-button-container {
    .grid-container {
      grid-template-columns: repeat(13, 1fr);
      display: grid;
      width: auto;
      margin-top: 1rem;
    }
    .button-container {
      margin-top: 0.75rem;

      button {
        font-size: calc(0.65rem + 0.390625vw) !important;
        padding: 0.35rem !important;
        margin: 0.45rem 0.3rem 0.45rem 0.3rem !important;
      }
    }
  }

  .control-container {
    height: 25%;
    place-content: center;
    button,
    input,
    label {
      margin: 0.5rem;
    }
    label {
      color: white;
      font-size: calc(0.6rem + 0.390625vw);
    }
    select {
      border-radius: 3px;
      width: fit-content;
      min-width: 6vw;
      font-size: calc(0.6rem + 0.390625vw);
    }
    button {
      margin-top: 1.5rem !important;
      font-size: calc(0.6rem + 0.390625vw);
    }
  }
  .selected-clue {
    display: none;
    color: white;
  }
  // clues
  .clue-container,
  .no-clues {
    margin: auto;
    width: 35vw;
    min-height: 90vh;
    color: #d1d0ce;

    h2 {
      border-bottom: 1px rgba(80, 80, 80, 0.8) solid;
      font-size: clamp(1.25rem, 1.7vw, 1.5rem);
      font-weight: 700;
      color: var(--primary-100);
      height: 1.75rem;
    }

    div.clue-item {
      font-size: clamp(1rem, 1vw, 1.25rem);
      border-radius: 0.2rem;
      margin: 0.55rem 0 0.55rem 0;
      padding: 0 0.9rem 0 0.9rem;
      color: darkgray;
      display: grid;
      grid-template-columns: 10% 90%;
      gap: 0.5rem;

      &:hover {
        cursor: pointer;
      }
    }
    .down {
      margin-top: 1.25rem;
    }
  }
  .no-clues {
    padding: 1rem;
    place-content: center;
    display: grid;
    border: 1px rgba(80, 80, 80, 0.8) solid;
    p {
      font-size: calc(1.2rem + 0.390625vw);
      max-width: 90%;
      margin: auto;
      text-align: center;
    }
  }

  @media (max-width: 600px) {
    /* min-height: calc(100vh - var(--nav-height)); */
    height: fit-content;
    grid-template-columns: 1fr;
    width: 100%;
    .control-container {
      display: flex;
      height: fit-content;
      max-width: 100%;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      label {
        height: fit-content;
      }
      select {
        height: fit-content;
        min-width: calc((0.6rem + 0.390625vw) * 8);
      }
      button {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: 0 !important;
      }
    }
    .selected-clue {
      margin: 0.5rem 0 0rem 0;
      grid-template-columns: 10% 75% 15%;
      display: grid;
      min-height: 2rem;
      div {
        display: grid;
        place-content: center;
        height: fit-content;

        p {
          text-align: center;
        }
        .clue-text {
          margin: auto;
          overflow-x: wrap;
        }
      }
    }

    .grid-container {
      margin: auto;
    }
    .clue-container,
    .no-clues {
      width: 100%;
      margin-top: 1rem;
    }
    .no-clues {
      display: block;
      width: 90vw;
      min-height: fit-content;
    }
    .powered-by {
      width: 100%;
      margin-left: 0;
      margin-top: 0.5rem;
      display: flex;
      position: relative;
      height: 1rem;
    }
    .grid-button-container {
      .button-container {
        button {
          font-size: calc(0.9rem + 0.390625vw) !important;
          padding: 0.25rem !important;
          margin: 0.6rem 0.3rem 0.6rem 0.3rem !important;
        }
      }
    }
  }

  @media (min-width: 601px) {
    .powered-by {
      display: none;
    }
  }
`;
