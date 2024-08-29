import styled from "styled-components";

// components

import GridRefactor from "../components/GridRefactor";

const Editor: React.FC = () => {
  return (
    <Wrapper>
      <GridRefactor />
    </Wrapper>
  );
};

export default Editor;

const Wrapper = styled.div`
  height: calc(100vh - var(--nav-height));
  display: grid;
  place-content: center;

  width: 100%;
  background-color: #1c1d1f;
  position: relative;
`;
