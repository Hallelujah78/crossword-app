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

import ErrorPage from "./ErrorPage";
import SolveCell from "./SolveCell";

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
import useClueFetch from "../hooks/useClueFetch";

const SolveGrid: React.FC = () => {
  const [gridState, setGridState] = useState<CellType[]>(() => {
    const gridStateStore = getLocalStorage("solver")?.grid;
    return gridStateStore
      ? gridStateStore
      : initializeGrid(JSON.parse(JSON.stringify(initialGrid)));
  });
  const [clueList, setClueList] = useState<Clue[]>(() => {
    const clueState = getLocalStorage("solver")?.clues;
    return clueState ? clueState : initializeApp(gridState);
  });
  const [removeEmpty, _setRemoveEmpty] = useState<boolean>(false);

  const [selectedClue, setSelectedClue] = useState<string>(() => {
    const selectedClueStorage = getLocalStorage("solver")?.clueSelection;
    return selectedClueStorage ? selectedClueStorage : "";
  });
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
  // const [error, setError] = useState<Error | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isLoading, error, getClues, newClues } = useClueFetch();

  useEffect(() => {
    setLocalStorage("solver", {
      grid: gridState,
      clues: clueList,
      clueSelection: selectedClue,
      cellSelection: selectedCell,
    });
  }, [gridState, clueList, selectedClue, selectedCell]);

  useEffect(() => {
    if (newClues?.[0].id) {
      setClueList(newClues as Clue[]);
    }
  }, [newClues]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tempPuzzles = JSON.parse(JSON.stringify(puzzles));
    const selectedVal = e.target.value;
    if (e.target?.value === "-" || e.target.id === "reset-all") {
      // reset the state
      setSelectedCell(undefined);
      setSelectedClue("");
      const resetGrid = initializeGrid(JSON.parse(JSON.stringify(initialGrid)));
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

  const handleAlpha = (val?: string) => {
    const clues = [...clueList];
    const grid = [...gridState];

    const currSelectedClue = clues.find((clue) => clue.id === selectedClue);
    let targetCell: CellType | undefined = selectedCell
      ? { ...selectedCell, answer: val }
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
        ? {
            ...gridItem,
            answer: val,
          }
        : gridItem
    );
    setSelectedCell(targetCell);
    setGridState(updatedGrid);
  };

  const handleClueClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const grid = JSON.parse(JSON.stringify(gridState));
    const clues = JSON.parse(JSON.stringify(clueList));
    const target = e.currentTarget;
    const currSelectedClue = clues.find((clue: Clue) => clue.id === target.id);

    if (target && currSelectedClue) {
      resetSelectedCells(grid);
      setSelection(grid, currSelectedClue);
      setSelectedCell(grid[currSelectedClue.indices[0]]);
      cellRefs.current[currSelectedClue.indices[0]]?.focus();
      setSelectedClue(currSelectedClue.id);
      setGridState(grid);
    }
  };

  const handleKeyDown = (val: string) => {
    if (val === "Backspace") {
      handleDelete();
    }
    if (val && "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(val.toUpperCase())) {
      handleAlpha(val);
    }
    if (
      val === "ArrowUp" ||
      val === "ArrowDown" ||
      val === "ArrowLeft" ||
      val === "ArrowRight"
    ) {
      handleArrowKeyPress(val);
    }
  };

  const handleDelete = () => {
    if (!selectedCell) {
      return;
    }
    // e.preventDefault();
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

  const handleTabPress = (e: KeyboardEvent) => {
    e.preventDefault();
    if (selectedClue === "" || e?.key !== "Tab") {
      return;
    }
    // event.preventDefault();
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
    if (selectedClue !== "" && e.key === "Tab" && !e.shiftKey) {
      if (index === clues.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
    }
    if (selectedClue !== "" && e.key === "Tab" && e.shiftKey) {
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

  const handleArrowKeyPress = (val: string) => {
    if (
      !selectedCell ||
      (val !== "ArrowDown" &&
        val !== "ArrowUp" &&
        val !== "ArrowLeft" &&
        val !== "ArrowRight")
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

    if (val === "ArrowDown") {
      targetCell = getCellBelow(grid, cellId);
    }
    if (val === "ArrowUp") {
      targetCell = getCellAbove(grid, cellId);
    }
    if (val === "ArrowLeft" && !isLeftEdge(grid, cellId)) {
      targetCell = grid[cellId - 1];
    }
    if (val === "ArrowRight" && !isRightEdge(grid, cellId)) {
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
    let currSelectedClue: Clue | undefined;
    if (clueList && selectedClue)
      currSelectedClue = clueList.find((clue) => clue.id === selectedClue);

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
            <p className="answer-length">{getWordLength(currSelectedClue)}</p>
          </div>
        </>
      );
    }
  };

  const generateAnswers = (grid: CellType[], clues: Clue[]) => {
    let hasEmpty = grid.filter((cell) => {
      if (!cell.isVoid && !cell.letter) {
        return cell;
      }
    });
    let newState = { grid, clues };
    if (!removeEmpty && hasEmpty.length > 0) {
      while (hasEmpty.length > 0) {
        newState = resetAllAnswers(clues, grid);
        newState = populateClues(
          newState.clues,
          AllAnswers,
          newState.grid,
          removeEmpty
        );

        hasEmpty = newState.grid.filter((cell) => {
          if (!cell.isVoid && !cell.letter) {
            return cell;
          }
        });
      }
      return newState;
    }
    // removeEmpty is true => we remove empty cells
    newState = populateClues(clues, AllAnswers, grid, removeEmpty);
    return newState;
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
          onClick={async () => {
            let newState: { clues: Clue[]; grid: CellType[] } = {
              clues: [],
              grid: [],
            };
            setSelectedPuzzle("-");
            setSelectedCell(undefined);
            setSelectedClue("");
            newState.grid = initializeGrid(
              JSON.parse(JSON.stringify(initialGrid))
            );
            newState.clues = initializeApp(newState.grid);

            newState = generateAnswers(newState.grid, newState.clues);
            setGridState(newState.grid);
            await getClues(newState.clues);
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
                handleTabKeyPress={handleTabPress}
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
    max-width: 100%;
    width: 100% !important;
    .grid-container {
      display: grid;
      grid-template-columns: repeat(13, 1fr);
      max-width: 100% !important;
      margin-top: 1rem;
    }
    .button-container {
      margin-top: 0.75rem;

      button {
        font-size: calc(0.65rem + 0.390625vw) !important;
        padding: 0.35rem !important;
        margin: 0.45rem 0.3rem 0.45rem 0.3rem !important;
        min-width: 8vw;
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
      margin: 0.5rem auto 0rem auto;
      grid-template-columns: 10% 75% 15%;
      display: grid;
      min-height: 2rem;
      max-height: fit-content;
      width: 95%;
      max-width: 95%;

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
      max-width: 100% !important;
      width: 100% !important;
    }
    .clue-container,
    .no-clues {
      width: 90%;
      max-width: 90%;
      margin-top: 1rem;
      div.clue-item {
        max-width: 99%;
      }
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
