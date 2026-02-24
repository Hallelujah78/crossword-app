// react
import { type RefObject, useEffect, useRef, useState } from "react";

// libs
import { FaCircleInfo } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import type Clue from "../classes/Clue.ts";
// hooks
import useClueFetch from "../hooks/useClueFetch.ts";
import useModal from "../hooks/useModal.ts";
// models
import type { CellType } from "../models/Cell.model.ts";
import { Direction } from "../models/Direction.model.ts";
import type { Puzzles } from "../models/Puzzles.model.ts";

// data/state
import * as AllAnswers from "../state/answers2.ts";
import { initialGrid } from "../state/grid.ts";
import invalidGridSteps from "../state/invalidGridSteps.tsx";
import steps from "../state/walkthroughSteps.tsx";
// utils
import {
	createClues,
	getAcrossClues,
	getDownClues,
	getLocalStorage,
	initializeApp,
	initializeGrid,
	isGridValid,
	populateClues,
	resetAllAnswers,
	setClueNumbers,
	setCluesThatIntersect,
	setLocalStorage,
	sortCluesDescendingLength,
	updateSurroundingCells,
	validateGrid,
} from "../utils/utils.ts";
// components
import Cell from "./Cell.tsx";
import Information from "./Information.tsx";
import LoadingSmall from "./LoadingSmall.tsx";

const Grid: React.FC = () => {
	const [isGeneratingAnswers, setIsGeneratingAnswers] = useState(false);
	// const [isFetchingClues, setIsFetchingClues] = useState(false);
	const [puzzleName, setPuzzleName] = useState<string>("");
	const [isModified, setIsModified] = useState<boolean>(() => {
		const modifiedState = getLocalStorage("editor")?.isModified;
		return modifiedState ? modifiedState : false;
	});
	const [gridState, setGridState] = useState<CellType[]>(() => {
		const storage = getLocalStorage("editor")?.grid;
		return storage
			? storage
			: initializeGrid(JSON.parse(JSON.stringify(initialGrid)));
	});
	const [clueList, setClueList] = useState<Clue[]>(() => {
		const clueState = getLocalStorage("editor")?.clues;
		return clueState ? clueState : initializeApp(gridState);
	});
	const [removeEmpty, setRemoveEmpty] = useState<boolean>(false);
	const [fillGrid, setFillGrid] = useState<boolean>(true);
	const [isValid, setIsValid] = useState<boolean>(() => {
		return localStorage.getItem("editor")
			? isGridValid(gridState as CellType[])
			: true;
	});
	const { isVisible, close } = useModal(true);
	const {
		isVisible: isModalVisible,
		show: showModal,
		close: closeModal,
	} = useModal(false);

	const [hideWarn, sethideWarn] = useState<boolean | undefined>(() => {
		return localStorage.getItem("editor")
			? getLocalStorage("editor")?.warn
			: false;
	});

	const linkRef = useOutletContext() as RefObject<HTMLElement>;
	const stepRefs = useRef<HTMLElement[]>([]);
	const { isLoading, getClues, newClues } = useClueFetch();

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

	useEffect(() => {
		if (newClues?.[0].id) {
			setClueList(newClues as Clue[]);
		}
	}, [newClues]);

	const saveHandler = () => {
		let puzzles: Puzzles = [];
		if (localStorage.getItem("puzzles")) {
			puzzles = getLocalStorage("puzzles") as Puzzles;
		}
		puzzles.push({
			name: puzzleName,
			grid: gridState as CellType[],
			clues: clueList as Clue[],
		});

		setLocalStorage("puzzles", { puzzles });
	};

	const generateClues = () => {
		const grid: CellType[] = JSON.parse(JSON.stringify(gridState));
		const clues: Clue[] = JSON.parse(JSON.stringify(clueList));

		let newState = { grid, clues };

		let hasEmpty = newState.grid.filter((cell) => !cell.isVoid && !cell.letter);

		if (fillGrid && hasEmpty.length > 0) {
			while (hasEmpty.length > 0) {
				newState = resetAllAnswers(clueList, gridState);
				newState = populateClues(
					newState.clues,
					AllAnswers,
					newState.grid,
					removeEmpty,
				);

				hasEmpty = newState.grid.filter((cell) => !cell.isVoid && !cell.letter);
			}

		} else {
			// fillgrid is false OR hasEmpty is empty
			// this else is essentially the "don't force fill" section
			// in other words, remove the empty cells, and if the grid winds up being invalid, iterate over it until it is not
			newState = populateClues(
				newState.clues,
				AllAnswers,
				newState.grid,
				removeEmpty,
			);
			let valid = validateGrid(newState.clues, newState.grid);

			while (!valid) {
				newState.grid = JSON.parse(JSON.stringify(gridState));
				newState.clues = JSON.parse(JSON.stringify(clueList));
				newState = populateClues(
					newState.clues,
					AllAnswers,
					newState.grid,
					removeEmpty,
				);
				valid = validateGrid(newState.clues, newState.grid);
			}
		}
		setIsModified(
			JSON.stringify(initialGrid) !== JSON.stringify(newState.grid),
		);
		return newState;
	};

	const handleClick = (e: React.MouseEvent) => {
		if (!e.currentTarget.id || isGeneratingAnswers) {
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
		setIsValid(true);
		const valid = validateGrid(clues, tempGrid);
		setIsValid(valid);
		sortCluesDescendingLength(clues);
		setClueList(clues);
		setGridState(tempGrid);
		setIsModified(true);
	};

	return (
		<Wrapper>
			<div className="control-container">
				<button
					style={{
						backgroundColor: `${
							isGeneratingAnswers
								? "red"
								: !isValid || !clueList[0]?.answer.includes("")
									? "var(--primary-100) "
									: "var(--primary-400)"
						}`,
					}}
					className="step4 generate-ans"
					ref={(el) => {
						if (el) stepRefs.current.push(el);
					}}
					type="button"
					disabled={!isValid || !clueList[0]?.answer.includes("")}
					onClick={() => {
						setIsGeneratingAnswers(true);
						let newState: { clues: Clue[]; grid: CellType[] } = {
							clues: [],
							grid: [],
						};
						setTimeout(() => {
							newState = generateClues();
							setGridState(newState.grid);
							setClueList(newState.clues);
							setIsGeneratingAnswers(false);
						}, 200);
					}}
				>
					{!isGeneratingAnswers ? (
						<div>
							<p className="button-text">Generate Answers</p>
						</div>
					) : (
						<div>
							<p className="button-text">Please wait...</p>
							<LoadingSmall />
						</div>
					)}
				</button>

				<br />
				<div className="checkbox-group">
					<label htmlFor="disable">Disable Warnings</label>
					<input
						disabled={isGeneratingAnswers}
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
						disabled={isGeneratingAnswers}
						className="step5"
						ref={(el) => {
							if (el) stepRefs.current.push(el);
						}}
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
				<div className="reset">
					<button
						className="step6"
						ref={(el) => {
							if (el) stepRefs.current.push(el);
						}}
						disabled={
							clueList[0]?.answer.includes("") ||
							clueList[0]?.clue !== "" ||
							isGeneratingAnswers
						}
						type="button"
						onClick={() => {
							const { grid: resetGrid, clues: resetClues } = resetAllAnswers(
								clueList,
								gridState,
							);
							setGridState(resetGrid);
							setClueList(resetClues);
						}}
					>
						Reset Answers
					</button>
					<button
						disabled={
							!isModified ||
							isGeneratingAnswers ||
					
							clueList[0]?.clue !== ""
						}
						type="button"
						onClick={() => {
							const newGrid = initializeGrid(
								JSON.parse(JSON.stringify(initialGrid)),
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
				</div>
				<br />
				<button
					style={{
						backgroundColor: `${
							isLoading
								? "red"
								: !isValid ||
										clueList[0]?.clue !== "" ||
										clueList[0]?.answer.includes("")
									? "var(--primary-100)"
									: "var(--primary-400)"
						}`,
					}}
					className="step7 generate-clues"
					ref={(el) => {
						if (el) stepRefs.current.push(el);
					}}
					disabled={
						!isValid ||
						clueList[0]?.clue !== "" ||
						clueList[0]?.answer.includes("")
					}
					type="button"
					onClick={async () => {
						// setIsFetchingClues(true);
						await getClues(clueList);
						// setIsFetchingClues(false);
					}}
				>
					{!isLoading ? (
						<div>
							<p className="button-text">Fetch Clues from OpenAI</p>
						</div>
					) : (
						<div>
							<p className="button-text">Fetching clues...</p>
							<LoadingSmall />
						</div>
					)}
				</button>
				<br />

				<form className="save-container">
					<input
						disabled={
							clueList[0]?.answer.includes("") ||
							clueList[0]?.clue === "" ||
							isGeneratingAnswers
						}
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
						className="step8 save-crossword"
						ref={(el) => {
							if (el) stepRefs.current.push(el);
						}}
						disabled={
							clueList[0]?.answer.includes("") ||
							puzzleName.length < 3 ||
							clueList[0]?.clue === ""
						}
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							saveHandler();
							const resetGrid = initializeGrid(
								JSON.parse(JSON.stringify(initialGrid)),
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

				{clueList[0]?.answer.includes("") ? null : (
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

			{isVisible && !localStorage.getItem("editor") && (
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
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - var(--nav-height));
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

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
    .reset {
      display: grid;
      grid-template-columns: 1fr 1fr;
      button {
        min-height: 2.5rem;
        width: fit-content !important;
        min-width: 95%;
      }
    }
    .generate-ans,
    .generate-clues,
    .save-crossword {
      max-height: 2.4rem;
      min-height: 2.4rem;
      padding: 0.6rem !important;
      div {
        display: flex inline;
        p {
          padding: 0;
          margin-right: 0.75rem;
          line-height: 1.4rem;
        }
      }
    }
  }

  .checkbox-group {
    display: grid;
    grid-template-columns: 4fr 1fr;
  }
  .save-container {
    display: flex;

    align-items: center;
    input {
      font-size: 1rem;
      padding-left: 1rem;
      width: 9rem;
      text-transform: capitalize;
      border-radius: 3px;
      &:disabled::placeholder {
        color: lightgray;
        text-align: center;
        font-size: 0.75rem;
      }
    }
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 100%;
    .control-container {
      padding-top: 0.5rem;

      height: fit-content;
      max-width: 100%;

      button,
      input,
      label {
      }
      label {
      }
      .generate-ans {
        min-width: 39vw !important;
        div {
          display: flex inline;
          gap: 0.75rem;
          p {
            margin-right: 0rem !important;
          }
        }
      }
    }
    button {
      height: fit-content !important;
      width: fit-content !important;
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
    .grid-container {
      margin: 0 auto 0 auto;
    }
  }
`;
