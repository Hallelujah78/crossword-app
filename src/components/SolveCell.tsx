import React from "react";
import styled from "styled-components";

// models
import type { CellProps } from "../models/CellProps.model";

const SolveCell = React.forwardRef<HTMLInputElement, CellProps>(
  ({ cell, handleCellClick, handleKeyDown }, ref) => {
    const { isVoid, id, clueNumber, selected, answer } = cell;

    return (
      <Wrapper id={id} style={{ background: isVoid ? "black" : "white" }}>
        <div className="letter-container">
          {isVoid ? null : (
            <input
              onKeyDown={(e) => {
                if (e.key === "Unidentified") {
                } else {
                  return handleKeyDown ? handleKeyDown(e) : () => {};
                }
              }}
              onChange={() => {}}
              value={answer}
              ref={ref}
              spellCheck={false}
              autoComplete="off"
              id={id.toString()}
              onClick={(event) => {
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
    height: calc(95vw / 13);
    width: calc(95vw / 13);
  }
`;
