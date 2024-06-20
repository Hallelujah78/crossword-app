// libs
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { RiOpenaiFill } from "react-icons/ri";

const Root: React.FC = () => {
  return (
    <Wrapper>
      <nav>
        <div className="powered-by">
          <h1>Powered by OpenAI</h1>
          <RiOpenaiFill className="ai-icon" />
        </div>
        <h1 className="title">CrossWord</h1>
        <div className="link-container">
          <NavLink to={"/"}>Create/Edit</NavLink>
          <NavLink to={"solver"}>Solve</NavLink>
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
    .powered-by {
      position: absolute;
      height: 3rem;
      line-height: 3rem;
      margin-left: 2rem;
      display: flex;
    }
    .ai-icon {
      line-height: 3rem;
      font-size: 2rem;
      padding: 0.5rem 0;
      margin-left: 0.5rem;
    }
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
