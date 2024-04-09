import styled from "styled-components";

// models
import { CellProps } from "../models/CellProps.model";
import React from "react";

const Cell: React.FC<CellProps> = ({ cell, handleClick }) => {
  const { isVoid, id, clueNumber } = cell;

  return (
    <Wrapper
      id={id}
      onClick={(e: React.MouseEvent) => handleClick(e)}
      style={{ background: isVoid ? "black" : "white" }}
    >
      <div className="clue-number">{clueNumber}</div>
    </Wrapper>
  );
};
export default Cell;

const Wrapper = styled.div<{ id: number | undefined }>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: calc(85vh / 13);
  width: calc(85vh / 13);
  border: black solid 1px !important;
  .clue-number {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.1rem;
  }
`;
