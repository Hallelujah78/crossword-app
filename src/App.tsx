import styled from "styled-components";

const App: React.FC = () => {
  return (
    <Wrapper>
      <nav>
        <h1>TypeScript, React, Vite, Cypress Starter</h1>
      </nav>
      <section>a section</section>
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
    display: grid;
    place-content: center;
    max-width: 100%;
  }
`;
