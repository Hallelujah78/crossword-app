import styled from "styled-components";

// models
import { CellProps } from "../models/CellProps.model";
import React from "react";

const SolveCell: React.FC<CellProps> = ({ cell, handleCellClick }) => {
  const { isVoid, id, clueNumber, selected } = cell;

  return (
    <Wrapper id={id} style={{ background: isVoid ? "black" : "white" }}>
      <div className="letter-container">
        {isVoid ? null : (
          <input
            autoComplete="off"
            id={id.toString()}
            onClick={(event) => {
              handleCellClick!(event);
            }}
            maxLength={1}
            type="text"
            style={{ background: selected ? "lightyellow" : "white" }}
          />
        )}
      </div>
      <div className="clue-number">{clueNumber}</div>
    </Wrapper>
  );
};
export default SolveCell;

const Wrapper = styled.div<{ id: number | undefined }>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: calc(85vh / 13);
  width: calc(85vh / 13);
  border: black solid 1px !important;
  .clue-number {
    position: absolute;
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
    line-height: calc(85vh / 13);
    font-weight: bold;
    display: grid;
    /* place-content: center; */
    input {
      text-transform: uppercase;
      text-align: center;
      z-index: 99;
      display: inline-block;
      height: 92%;
      width: 92%;
      border: none;
      font-size: 1.3rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
