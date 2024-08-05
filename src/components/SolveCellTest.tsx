import React, { useEffect, useState } from "react";
import styled from "styled-components";

// models
import type { CellPropsRefactor } from "../models/CellPropsRefactor.model";

const SolveCellTest = React.forwardRef<HTMLInputElement, CellPropsRefactor>(
  ({ cell, handleCellClick, handleKeyDown }, ref) => {
    const { isVoid, id, clueNumber, selected, answer } = cell;

    const [cellValue, setCellValue] = useState("");

    useEffect(() => {
      // if handleKeyDown is defined, call it when state of input changes
      if (handleKeyDown) handleKeyDown(cellValue);
      // this is purely for mobile
    }, [cellValue]);

    useEffect(() => {
      // if handleKeyDown is defined, call it when state of input changes

      answer !== undefined && setCellValue(answer);

      // this is purely for mobile
    }, [answer]);

    return (
      <Wrapper id={id} style={{ background: isVoid ? "black" : "white" }}>
        <div className="letter-container">
          {isVoid ? null : (
            <input
              onChange={(e) => {
                // this purely updates local state for the input
                // which in turn calls the useEffect
                if (cellValue.length > 0) {
                  return;
                }
                console.log(
                  "target value in solveCell (state): ",
                  e.target.value
                );
                setCellValue(e.target.value);
              }}
              onKeyDown={(e) => {
                // this handles everything on desktop
                // it should handle backspace?
                if (handleKeyDown) {
                  if (e.key !== "Unidentified") {
                    console.log("e.key onKeyDown is: ", e.key);
                    handleKeyDown(e.key);
                  }
                }
              }}
              value={cellValue}
              ref={ref}
              spellCheck={false}
              autoComplete="off"
              id={id.toString()}
              onClick={(event) => {
                if (answer !== undefined) {
                  setCellValue(answer);
                }
                handleCellClick ? handleCellClick(event) : () => {};
              }}
              maxLength={1}
              type="text"
              style={{ background: selected ? "#fff7b2  " : "white" }}
            />
          )}
        </div>
        <div className="clue-number">{clueNumber}</div>
      </Wrapper>
    );
  }
);
export default SolveCellTest;

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
    height: calc(95vw / 13);
    width: calc(95vw / 13);
  }
`;
