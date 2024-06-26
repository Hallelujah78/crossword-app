import styled from "styled-components";

// models
import type { CellProps } from "../models/CellProps.model";

const Cell: React.FC<CellProps> = ({ cell, handleClick }) => {
  const { isVoid, id, clueNumber, letter, isValid, backgroundColor } = cell;

  return (
    <Wrapper
      id={id}
      onClick={(e: React.MouseEvent) =>
        handleClick ? handleClick(e) : () => {}
      }
      style={{
        background: backgroundColor
          ? backgroundColor
          : isVoid
          ? "black"
          : "white",
        border: isValid ? "black solid 1px" : "red 3px solid",
      }}
    >
      <div className="letter-container">{letter}</div>
      <div className="clue-number">{clueNumber}</div>
    </Wrapper>
  );
};
export default Cell;

const Wrapper = styled.div<{ id: number | undefined }>`
  cursor: pointer;
  position: relative;

  display: inline-block;
  height: calc(85vh / 13);
  width: calc(85vh / 13);
  /* border: black solid 1px !important; */
  .clue-number {
    position: absolute;
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
  }
`;
