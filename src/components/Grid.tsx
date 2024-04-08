import styled from "styled-components";

// components
import Cell from "./Cell";

// data
import { grid } from "../data/grid";

const Grid: React.FC = () => {
  return (
    <Wrapper>
      {grid.map((cell, index) => {
        return <Cell key={index} cell={cell} />;
      })}
    </Wrapper>
  );
};
export default Grid;

const Wrapper = styled.div`
  grid-template-columns: repeat(13, 1fr);
  align-content: start;
  display: grid;
  width: 85vh;
  height: 85vh;
  border: red solid 1px;
  gap: 0;
`;
