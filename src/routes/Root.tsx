// react
import { useRef } from "react";

// libs
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import PoweredBy from "../components/PoweredBy";

const Root: React.FC = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <Wrapper>
      <nav>
        <PoweredBy />
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
  }

  .title {
    margin: auto;
    height: 100%;
    font-size: calc(1.5rem + 0.390625vw) !important;
    line-height: 3rem;
  }

  section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
  @media (max-width: 500px) {
    .powered-by {
      display: none;
    }
  }
`;
