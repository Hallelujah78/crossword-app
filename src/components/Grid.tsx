// react
import { useState, useEffect, useRef, type MutableRefObject } from "react";

// models
import type { CellType } from "../models/Cell.model";
import { Direction } from "../models/Direction.model";
import type { Puzzles } from "../models/Puzzles.model";
import type Clue from "../classes/Clue";

// libs
import styled, { keyframes } from "styled-components";
import { useOutletContext } from "react-router-dom";

// components
import Cell from "./Cell";
import Information from "./Information";

// data/state
import { initialGrid } from "../state/grid";
import * as AllAnswers from "../state/answers2";
import backgroundColors from "../state/backgroundColors";
import steps from "../state/walkthroughSteps";
import invalidGridSteps from "../state/invalidGridSteps.ts";

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
import { FaCircleInfo } from "react-icons/fa6";

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
  const { isVisible, close } = useModal(true);
  const {
    isVisible: isModalVisible,
    show: showModal,
    close: closeModal,
  } = useModal(false);

  const [hideWarn, sethideWarn] = useState<boolean | null>(() => {
    return localStorage.getItem("editor")
      ? getLocalStorage("editor")?.warn
      : false;
  });

  const linkRef = useOutletContext() as MutableRefObject<HTMLElement>;
  const stepRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    setLocalStorage("editor", {
      grid: gridState,
      clues: clueList,
      isModified,
      warn: hideWarn,
    });
    if (linkRef) {
      stepRefs.current.push(linkRef.current);
    }
  }, [gridState, clueList, isModified, linkRef, hideWarn]);

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
          className="step4"
          ref={(el) => {
            if (el) stepRefs.current.push(el);
          }}
          type="button"
          disabled={!isValid || !clueList[0].answer.includes("")}
          onClick={() => generateClues()}
        >
          Generate Answers
        </button>
        <br />
        <div className="checkbox-group">
          <label htmlFor="disable">Disable Warnings</label>
          <input
            ref={(el) => {
              if (el) stepRefs.current.push(el);
            }}
            checked={hideWarn}
            className="step4-5"
            onChange={() => {
              sethideWarn((prev) => !prev);
            }}
            id="disable"
            name="disable"
            type="checkbox"
          />
        </div>

        <br />
        <div className="checkbox-group">
          <label htmlFor="fill_grid">Force Fill Grid</label>
          <input
            className="step5"
            ref={(el) => el && stepRefs.current.push(el)}
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
          className="step6"
          ref={(el) => {
            if (el) stepRefs.current.push(el);
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
          className="step7"
          ref={(el) => {
            if (el) stepRefs.current.push(el);
          }}
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
            className="step8"
            ref={(el) => {
              if (el) stepRefs.current.push(el);
            }}
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
      <div
        className="grid-container step2"
        ref={(el) => {
          if (el) stepRefs.current.push(el);
        }}
      >
        {gridState.map((cell) => {
          return <Cell key={cell.id} cell={cell} handleClick={handleClick} />;
        })}

        {clueList[0].answer.includes("") ? null : (
          <div className="prevent-click"> </div>
        )}
        {!isValid && !hideWarn && (
          <div className="invalid-grid">
            <p>Invalid Grid!</p>

            <button onClick={showModal} className="info-button" type="button">
              <FaCircleInfo className="info-icon" />
            </button>
          </div>
        )}
      </div>

      {isVisible && localStorage.getItem("editor") && (
        <Information
          myRefs={stepRefs}
          steps={steps}
          close={close}
          isVisible={isVisible}
        />
      )}
      {isModalVisible && (
        <Information
          myRefs={stepRefs} // optional
          steps={invalidGridSteps}
          close={closeModal}
          isVisible={isVisible}
        />
      )}
    </Wrapper>
  );
};
export default Grid;

const pulse = keyframes`
  0% {
    transform: scale(.9);
  }
  70% {
    transform: scale(1);
  
  }
    100% {
    transform: scale(.9);
  
  }

`;
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
    position: relative;
    grid-template-columns: repeat(13, 1fr);
    display: grid;
    width: fit-content;
    height: fit-content;
    margin: auto;
    margin-left: 4rem;
    .prevent-click {
      height: 100%;
      width: 100%;
      background-color: rgba(138, 239, 247, 0.125);
      position: absolute;
      z-index: 1119;
      cursor: not-allowed;
    }
    .invalid-grid {
      top: -2.1rem;
      right: 50%;
      transform: translateX(50%);
      position: absolute;
      display: flex;
      color: white;
      background-color: #d47e7e;
      width: fit-content;
      height: 2rem;
      border-radius: 6px;
      padding: 0 0.5rem 0 0.5rem;
      p {
        width: fit-content;
        line-height: 2rem;
      }
      button.info-button {
        border-radius: 50%;
        width: 2rem !important;
        height: 2rem !important;
        margin-top: 0rem !important;
        padding: 0 !important;
        background: transparent !important;
        .info-icon {
          font-size: 2rem;
          background: var(--primary-400);
          border-radius: 50%;
          animation: ${pulse} 1.5s infinite;
        }
      }
    }
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
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    .control-container {
      height: fit-content;
      max-width: 100%;
    }
    .grid-container {
      margin: auto;
    }
  }
`;
