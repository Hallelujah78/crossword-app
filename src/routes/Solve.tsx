import styled from "styled-components";
import SolveGrid from "../components/SolveGrid";

const Solve: React.FC = () => {
  return (
    <Wrapper>
      <SolveGrid />
    </Wrapper>
  );
};

export default Solve;

const Wrapper = styled.div`
  height: calc(100vh - 3rem - 1px);
  display: grid;
  place-content: center;
  max-width: 100%;
  position: relative;
  background-color: #1c1d1f;
`;
