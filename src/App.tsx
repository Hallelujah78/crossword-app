import styled from "styled-components";

// components
import Grid from "./components/Grid";

const App: React.FC = () => {
  return (
    <Wrapper>
      <nav>
        <h1>TypeScript, React, Vite, Cypress Starter</h1>
      </nav>
      <section>
        <Grid />
      </section>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  nav {
    border-bottom: 1px solid gray;
    text-align: center;
    height: 3rem;
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
