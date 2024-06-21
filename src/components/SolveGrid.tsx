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
import { initialGrid } from "../data/grid";

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
      ? getLocalStorage("solver").clueSelection
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
      gridState,
      clueList,
      selectedClue,
      selectedCell,
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
    const grid = [...gridState];
    const clues = [...clueList];
    const target = e.currentTarget;
    const currSelectedClue = clues.find((clue) => clue.id === target.id);
    if (target && currSelectedClue) {
      resetSelectedCells([...gridState]);
      setSelection([...grid], currSelectedClue);
      setSelectedCell(grid[currSelectedClue.clueNumber]);
      cellRefs.current[currSelectedClue.indices[0]]?.focus();
      setSelectedClue(target.id);
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
        <li
          id={clue.id}
          onClick={(e) => handleClueClick(e)}
          onKeyDown={() => {}}
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

      // console.log("the data after response.json(): ", data);
      // console.log("the raw response: ", response);

      if (response.ok && data.content) {
        const { content } = JSON.parse(data);
        for (const clue of clues) {
          const id = clue.id;
          const clueResp = content.find((clueObj) => {
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
        setClueList(clues);
      } else {
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
          New Random Puzzle
        </button>
        <br />
        {/* <button type="button" onClick={getClues}>
          AI Generate Clues!
        </button> */}
      </div>
    </Wrapper>
  );
};
export default SolveGrid;

const Wrapper = styled.div`
  position: relative;
  .grid-container {
    grid-template-columns: repeat(13, 1fr);
    display: grid;
    width: auto;
    height: auto;
  }
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
    select {
      border-radius: 3px;
      min-width: 6vw;
    }
  }
  .clue-container {
    left: 42vw;
    position: absolute;
    width: 25vw;
    color: #d1d0ce;
    margin-top: -40rem;
    h2 {
      border-bottom: 1px rgba(80, 80, 80, 0.8) solid;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-100);
      height: 1.75rem;
      margin-top: 2.5rem;
    }

    li {
      border-radius: 0.2rem;
      margin: 0.5rem 0 0.5rem 0;
      padding: 0 0.9rem 0 0.9rem;
      color: darkgray;
      display: flex;
      justify-content: space-between;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
