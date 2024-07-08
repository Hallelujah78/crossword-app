import styled from "styled-components";

// components
import Grid from "../components/Grid";

const Editor: React.FC = () => {
  return (
    <Wrapper>
      <Grid />
      {/* {isVisible &&
        // localStorage.getItem("editor") for development, but !localStorage.getItem("editor")
        // when finished development
        localStorage.getItem("editor") && (
          <Information steps={steps} close={close} />
        )}
      {isVisible && position && (
        <ArrowLeft top={position.top} left={position.left} />
      )} */}
    </Wrapper>
  );
};

export default Editor;

const Wrapper = styled.div`
  height: calc(100vh - var(--nav-height));
  display: grid;
  place-content: center;
  max-width: 100%;
  width: 100vw;
  background-color: #1c1d1f;
  position: relative;
`;
