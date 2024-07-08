// react
import { useState, useEffect, useRef } from "react";

// models
import type { CellType } from "../models/Cell.model";
import { Direction } from "../models/Direction.model";
import type { Puzzles } from "../models/Puzzles.model";
import type Clue from "../classes/Clue";

// libs
import styled from "styled-components";
// components
import Cell from "./Cell";
import Information from "./Information";

// data/state
import { initialGrid } from "../state/grid";
import * as AllAnswers from "../state/answers2";
import backgroundColors from "../state/backgroundColors";
import steps from "../state/walkthroughSteps";

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
  resetAllAnswers,
  getLocalStorage,
  setLocalStorage,
  mergeSubarrays,
  setAllVoidEdgeInvalid,
  isGridValid,
} from "../utils/utils";

// hooks
import useModal from "../hooks/useModal";

const Grid: React.FC = () => {
  const [puzzleName, setPuzzleName] = useState<string>("");
  const [isModified, setIsModified] = useState<boolean>(() =>
    localStorage.getItem("editor")
      ? getLocalStorage("editor").isModified
      : false
  );
  const [gridState, setGridState] = useState<CellType[]>(() =>
    localStorage.getItem("editor")
      ? getLocalStorage("editor").grid
      : initializeGrid(JSON.parse(JSON.stringify(initialGrid)))
  );
  const [clueList, setClueList] = useState<Clue[]>(() =>
    localStorage.getItem("editor")
      ? getLocalStorage("editor").clues
      : initializeApp(gridState)
  );
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(false);
  const [fillGrid, setFillGrid] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(() => {
    return localStorage.getItem("editor")
      ? isGridValid(clueList, gridState)
      : true;
  });
  const { isVisible, show, close } = useModal();
  const firstStepRef = useRef<HTMLButtonElement | null>(null);
  const stepRefs = useRef<HTMLElement[]>([]);
  const [position, setPosition] = useState<
    { top: number; left: number } | undefined
  >();

  useEffect(() => {
    setLocalStorage("editor", { gridState, clueList, isModified });
  }, [gridState, clueList, isModified]);

  useEffect(
    () => {
      console.log(stepRefs.current[0]);
      if (firstStepRef?.current) {
        console.log(
          "the top of our el",
          firstStepRef?.current?.getBoundingClientRect()?.top
        );
        setPosition({
          top:
            firstStepRef?.current &&
            firstStepRef?.current?.getBoundingClientRect()?.top -
              window.scrollY,
          left:
            firstStepRef?.current &&
            firstStepRef?.current?.getBoundingClientRect()?.right -
              window.scrollX,
        });
      }
    },
    [
      // update each time window resize
    ]
  );

  const saveHandler = () => {
    let puzzles: Puzzles = [];
    if (localStorage.getItem("puzzles")) {
      puzzles = getLocalStorage("puzzles") as Puzzles;
    }
    puzzles.push({ name: puzzleName, grid: gridState, clues: clueList });
    localStorage.removeItem("editor");
    setLocalStorage("puzzles", { puzzles });
  };

  const validateGrid = (clues: Clue[], grid: CellType[]) => {
    setIsValid(true);
    // reset isValid to true and backgroundColor to ""
    for (const cell of grid) {
      cell.isValid = true;
      cell.backgroundColor = "";
    }

    const shortAnswers = clues.filter((clue) => clue.length < 3);
    const islandCell = grid.filter(
      (cell) =>
        !cell.isVoid && !cell.bottom && !cell.top && !cell.right && !cell.left
    );

    // short answers
    for (const clue of shortAnswers) {
      for (const index of clue.indices) {
        grid[index].isValid = false;
      }
    }

    // island cell - a type of short answer
    for (const cell of islandCell) {
      grid[cell.id].isValid = false;
    }

    // entire side is voids
    setAllVoidEdgeInvalid(grid);

    // are all light cells connected?
    const allLights = [];
    for (const clue of clues) {
      allLights.push(clue.indices);
    }
    const mergedLights = mergeSubarrays(allLights);

    if (mergedLights.length > 1) {
      for (const [index, lights] of mergedLights.entries()) {
        for (const num of lights) {
          grid[num].backgroundColor = backgroundColors[index];
        }
      }
    }

    for (const cell of grid) {
      if (cell.backgroundColor || !cell.isValid) {
        setIsValid(false);
        break;
      }
    }
  };

  async function getClues() {
    const clues = [...clueList];
    type ReqClue = {
      id: string;
      word: string;
      clue: string;
    };
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
      const data = (await response.json()) as ReqClue;

      // verify the data is as expected
      if (Array.isArray(data)) {
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
    const grid: CellType[] = JSON.parse(JSON.stringify(gridState));
    const clues: Clue[] = JSON.parse(JSON.stringify(clueList));

    let hasEmpty = grid.filter((cell) => {
      if (!cell.isVoid && !cell.letter) {
        return cell;
      }
    });
    if (!removeEmpty && hasEmpty.length > 0) {
      while (hasEmpty.length > 0) {
        const { grid: resetGrid, clues: resetClues } = resetAllAnswers(
          clueList,
          gridState
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

    validateGrid(clues, tempGrid);
    sortCluesDescendingLength(clues);
    setClueList(clues);
    setGridState(tempGrid);
    setIsModified(true);
  };

  return (
    <Wrapper>
      <div className="control-container">
        <button
          ref={firstStepRef}
          type="button"
          disabled={!isValid || !clueList[0].answer.includes("")}
          onClick={() => generateClues()}
        >
          Generate Answers
        </button>
        <br />
        <div className="checkbox-group">
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
        </div>

        <br />
        <div className="checkbox-group">
          <label htmlFor="fill_grid">Force Fill Grid</label>
          <input
            checked={fillGrid}
            onChange={() => {
              setRemoveEmpty((prev) => !prev);
              setFillGrid((prev) => !prev);
            }}
            type="checkbox"
            name="fill_grid"
            id="fill_grid"
          />
        </div>

        <br />
        <button
          ref={(el) => {
            stepRefs.current[0] = el;
          }}
          disabled={clueList[0].answer.includes("") || clueList[0].clue !== ""}
          type="button"
          onClick={() => {
            const { grid: resetGrid, clues: resetClues } = resetAllAnswers(
              clueList,
              gridState
            );
            setGridState(resetGrid);
            setClueList(resetClues);
          }}
        >
          Reset Answers
        </button>
        <button
          disabled={!isModified}
          type="button"
          onClick={() => {
            const newGrid = initializeGrid(
              JSON.parse(JSON.stringify(initialGrid))
            );
            const newClues = initializeApp(newGrid);
            setGridState(newGrid);
            setClueList(newClues);
            setIsModified(false);
            setIsValid(true);
          }}
        >
          Reset Grid & Answers
        </button>
        <br />
        <button
          disabled={
            !isValid ||
            clueList[0].clue !== "" ||
            clueList[0].answer.includes("")
          }
          type="button"
          onClick={getClues}
        >
          AI Generate Clues!
        </button>
        <br />

        <form className="save-container">
          <input
            required
            type="text"
            value={puzzleName}
            onChange={(e) => {
              setPuzzleName(e.target.value.toUpperCase());
            }}
            minLength={3}
            maxLength={9}
            placeholder="puzzleName"
          />
          <button
            disabled={
              clueList[0].answer.includes("") ||
              puzzleName.length < 3 ||
              clueList[0].clue === ""
            }
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              saveHandler();
              const resetGrid = initializeGrid(
                JSON.parse(JSON.stringify(initialGrid))
              );
              const resetClues = initializeApp(resetGrid);
              setGridState(resetGrid);
              setClueList(resetClues);
              setIsModified(false);
              setPuzzleName("");
            }}
          >
            Save Crossword
          </button>
        </form>
      </div>
      <div className="grid-container">
        {gridState.map((cell) => {
          return <Cell key={cell.id} cell={cell} handleClick={handleClick} />;
        })}

        {clueList[0].answer.includes("") ? null : (
          <div className="prevent-click"> </div>
        )}
      </div>
      {isVisible &&
        position &&
        // localStorage.getItem("editor") for development, but !localStorage.getItem("editor")
        // when finished development
        localStorage.getItem("editor") && (
          <Information
            myRefs={stepRefs}
            steps={steps}
            close={close}
            top={position?.top}
            left={position?.left}
            isVisible={isVisible}
          />
        )}
    </Wrapper>
  );
};
export default Grid;

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: calc(100vh - var(--nav-height));
  display: grid;
  place-content: center;
  grid-template-columns: 1fr 2fr 0.5fr;

  .grid-container {
    grid-template-columns: repeat(13, 1fr);
    display: grid;
    width: fit-content;
    height: fit-content;
    margin: auto;
    margin-left: 4rem;
  }

  .control-container {
    display: grid;
    height: calc(100vh - var(--nav-height));
    place-content: center;

    button,
    input,
    label {
      margin: 0.5rem;
    }
    label {
      color: white;
    }
  }
  .prevent-click {
    height: 100%;
    width: 100%;
    background-color: rgba(138, 239, 247, 0.125);
    position: absolute;
    z-index: 1119;
    cursor: not-allowed;
  }
  .checkbox-group {
    display: grid;
    grid-template-columns: 4fr 1fr;
  }
  .save-container {
    display: flex;

    input {
      font-size: 1rem;
      padding-left: 1rem;
      width: 9rem;
      text-transform: capitalize;
      border-radius: 3px;
    }
  }
`;
