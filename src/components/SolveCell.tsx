import React, { useEffect, useState } from "react";
import styled from "styled-components";

// models
import type { CellProps } from "../models/CellProps.model";
import { isLetter } from "../utils/utils";

const SolveCell = React.forwardRef<HTMLInputElement, CellProps>(
	({ cell, handleCellClick, handleKeyDown, handleTabKeyPress }, ref) => {
		const { isVoid, id, clueNumber, selected, answer } = cell;

		const [cellValue, setCellValue] = useState("");

		useEffect(() => {
			// when the local input state changes, update the global state
			if (handleKeyDown && answer !== cellValue && isLetter(cellValue)) {
				handleKeyDown(cellValue.toUpperCase());
			}
		}, [cellValue]);

		useEffect(() => {
			if (answer !== undefined && answer !== cellValue) {
				setCellValue(answer);
			}
		}, [answer]);

		return (
			<Wrapper id={id} style={{ background: isVoid ? "black" : "white" }}>
				<div className="letter-container">
					{isVoid ? null : (
						<input
							onInput={(e) => {
								const element = e.currentTarget;

								if (element.value.length <= 1 && isLetter(element.value)) {
									setCellValue(element.value);
								} else if (element.value.length > 1) {
									const lastChar = element.value.slice(-1);
									if (isLetter(lastChar)) setCellValue(lastChar);
								}
							}}
							onKeyDown={(e) => {
								if (handleKeyDown) {
									if (
										e.key === "Backspace" ||
										e.key === "ArrowDown" ||
										e.key === "ArrowUp" ||
										e.key === "ArrowLeft" ||
										e.key === "ArrowRight"
									) {
										e.preventDefault();
										handleKeyDown(e.key);
									}
									if (e.key === "Tab" && handleTabKeyPress) {
										e.preventDefault();
										// must have access to e.key due to shiftKey
										handleTabKeyPress(e);
									}
								}
							}}
							value={cellValue}
							ref={ref}
							spellCheck={false}
							autoComplete="off"
							id={id.toString()}
							onClick={(event: React.MouseEvent<HTMLInputElement>) => {
								const element = event.currentTarget;
								element.setSelectionRange(1, 1);
								handleCellClick ? handleCellClick(event) : () => {};
							}}
							type="text"
							style={{ background: selected ? "#fff7b2  " : "white" }}
						/>
					)}
				</div>
				<div className="clue-number">{clueNumber}</div>
			</Wrapper>
		);
	},
);
export default SolveCell;

const Wrapper = styled.div<{ id: number | undefined }>`
  position: relative;
  display: inline-block;
  height: calc(39vw / 13);
  width: calc(39vw / 13);
  border: black solid 1px !important;
  .clue-number {
    position: absolute;
    font-size: 0.75rem;
    z-index: 100;
    top: 0;
    left: 0;
    padding: 0.1rem;
  }
  .letter-container {
    margin: auto;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: calc(39vw / 13);
    font-weight: bold;
    display: grid;

    input {
      text-transform: uppercase;
      text-align: center;
      z-index: 99;
      display: inline-block;
      height: 100%;
      width: 100%;
      border: none;
      font-size: 1.3rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
  @media (max-width: 600px) {
    width: calc(100vw / 13);
    height: calc(100vw / 13);
  }
`;
