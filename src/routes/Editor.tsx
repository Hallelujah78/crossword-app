import styled from "styled-components";

// components
import Grid from "../components/Grid";

const Editor: React.FC = () => {
  return (
    <Wrapper>
      <nav>
        <h1>Crossword Generator</h1>
      </nav>
      <section>
        <Grid />
      </section>
    </Wrapper>
  );
};

export default Editor;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  background-color: #1c1d1f;
  nav {
    border-bottom: 1px solid gray;
    text-align: center;
    height: 3rem;
    color: white;
  }
  h1 {
    margin: auto;

    height: 100%;
    font-size: 3rem;
  }
  section {
    height: calc(100vh - 3rem);
    display: grid;
    place-content: center;
    max-width: 100%;
  }
`;
