import styled from "styled-components";

// models
import { CellProps } from "../models/Cell.model";

const Cell: React.FC<CellProps> = ({ cell }) => {
  const { isVoid } = cell;
  return <Wrapper style={{ background: isVoid ? "black" : "white" }}></Wrapper>;
};
export default Cell;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: calc(85vh / 13);
  width: calc(85vh / 13);
  border: black solid 1px;
`;
