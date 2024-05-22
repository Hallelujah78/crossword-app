import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";

const Root: React.FC = () => {
  async function getPhoto() {
    let apiURL = `/.netlify/functions/getPhotos`;

    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: { accept: "application/json" },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Wrapper>
      <nav>
        <h1 className="title">Crossword Generator</h1>
        <div className="link-container">
          <NavLink to={"editor"}>Create/Edit</NavLink>
          <NavLink to={"solver"}>Solve</NavLink>
          <button onClick={getPhoto}>get photos</button>
        </div>
      </nav>
      <section>
        <Outlet />
      </section>
    </Wrapper>
  );
};

export default Root;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  background-color: #1c1d1f;
  nav {
    display: flex;
    border-bottom: 1px solid gray;
    height: 3rem;
    color: white;
  }
  .title {
    margin: auto;
    height: 100%;
    font-size: 2.5rem;
    line-height: 3rem;
  }
  section {
    height: calc(100vh - 3rem - 1px);
    display: grid;
    place-content: center;
    max-width: 100%;
  }
  a {
    text-decoration: none;
    color: lightgray;
    font-size: 1.25rem;
    margin-right: 1rem;
    line-height: 3rem;
    &:hover {
      color: #8cb68c;
      transition: 1s linear all;
    }
  }
  a.active {
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    color: #eb9b9b;
  }
  .link-container {
    position: absolute;
    right: 1rem;

    display: flex;
    margin-right: 2rem;
  }
`;
