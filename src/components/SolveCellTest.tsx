import React, { useEffect, useState } from "react";
import styled from "styled-components";

// models
import type { CellPropsRefactor } from "../models/CellPropsRefactor.model";
import { isLetter } from "../utils/utils";

const SolveCellTest = React.forwardRef<HTMLInputElement, CellPropsRefactor>(
  ({ cell, handleCellClick, handleKeyDown, handleTabKeyPress }, ref) => {
    const { isVoid, id, clueNumber, selected, answer } = cell;

    const [cellValue, setCellValue] = useState("");

    useEffect(() => {
      // if handleKeyDown is defined, call it when state of input changes
      if (handleKeyDown && answer !== cellValue && isLetter(cellValue)) {
        handleKeyDown(cellValue.toUpperCase());
        console.log("UEff: handleKeyDown(cellValue)");
      }
      // this is purely for mobile
    }, [cellValue]);

    useEffect(() => {
      // if handleKeyDown is defined, call it when state of input changes

      if (answer !== undefined && answer !== cellValue) {
        console.log("UEff: setCellValue(answer)");
        setCellValue(answer);
      }

      // this is purely for mobile
    }, [answer]);

    return (
      <Wrapper id={id} style={{ background: isVoid ? "black" : "white" }}>
        <div className="letter-container">
          {isVoid ? null : (
            <input
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const element = e.target as HTMLInputElement;
                if (element.value.length <= 1) {
                  setCellValue(element.value);
                } else if (element.value.length > 1) {
                  const lastChar = element.value.slice(-1);
                  setCellValue(lastChar);
                }
              }}
              onKeyDown={(e) => {
                if (handleKeyDown)
                  if (e.key === "Backspace") {
                    e.preventDefault();
                    handleKeyDown(e.key);
                  }
                if (e.key === "Tab" && handleTabKeyPress) {
                  handleTabKeyPress(e);
                }
              }}
              value={cellValue}
              ref={ref}
              spellCheck={false}
              autoComplete="off"
              id={id.toString()}
              onClick={(event) => {
                const element = event.target as HTMLInputElement;
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
