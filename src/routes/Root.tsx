import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Root = () => {
  return (
    <Wrapper>
      <nav>
        <NavLink to={"editor"}>Create/Edit</NavLink>
        <NavLink to={"solver"}>Solve</NavLink>
        <h1 className="bg-teal-400">Crossword Generator</h1>
      </nav>
      <section></section>
    </Wrapper>
  );
};

export default Root;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  background-color: #1c1d1f;
  nav {
    border-bottom: 1px solid gray;
    /* text-align: center; */
    height: 3rem;
    color: white;
  }
  h1 {
    margin: auto;
    margin-left: 1rem;
    height: 100%;
    font-size: 2.5rem;
  }
  section {
    height: calc(100vh - 3rem);
    display: grid;
    place-content: center;
    max-width: 100%;
  }
`;
