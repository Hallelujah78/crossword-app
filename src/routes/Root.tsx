// react
import { useRef } from "react";

// libs
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { RiOpenaiFill } from "react-icons/ri";

const Root: React.FC = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <Wrapper>
      <nav>
        <div className="powered-by">
          <h1>Powered by OpenAI</h1>
          <RiOpenaiFill className="ai-icon" />
        </div>
        <h1 className="title">GridMaster</h1>
        <div className="link-container">
          <NavLink to={"/"}>Create</NavLink>
          <NavLink ref={linkRef} className="step9" to={"solver"}>
            Solve
          </NavLink>
        </div>
      </nav>
      <section>
        <Outlet context={linkRef} />
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
    align-items: center;
    .powered-by {
      position: absolute;
      height: 3rem;
      line-height: 3rem;
      margin-left: 2rem;
      display: flex;
      align-items: center;
      h1 {
        display: inline-block;
      }
      .ai-icon {
        vertical-align: middle;
        line-height: 3rem;
        font-size: 2rem;
        margin-left: 0.5rem;
      }
    }
  }

  .title {
    margin: auto;
    height: 100%;
    font-size: 2.5rem;
    line-height: 3rem;
  }

  section {
    margin: 0;
    padding: 0;
    box-sizing: border-box !important;
    height: calc(100vh - var(--nav-height));
    display: grid;
    place-content: center;
    max-width: 100%;
    width: 100%;
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
