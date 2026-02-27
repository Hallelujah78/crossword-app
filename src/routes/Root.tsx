// react
import { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
// libs
import styled from "styled-components";
// assets
import logo from "/android-chrome-192x192.png";
import PoweredBy from "../components/PoweredBy";

const Root: React.FC = () => {
	const linkRef = useRef<HTMLAnchorElement>(null);
	return (
		<Wrapper>
			<div className="nav-container">
				<nav>
					<div className="logo-container">
						<img
							className="logo"
							src={logo}
							alt="a logo contianing GM in white letters on a blue background"
						/>
					</div>
					<PoweredBy />
					<h1 className="title">GridMaster</h1>
					<div className="link-container">
						<NavLink to={"/"}>Create</NavLink>
						<NavLink ref={linkRef} className="step9" to={"solver"}>
							Solve
						</NavLink>
					</div>
				</nav>
			</div>
			<section>
				<Outlet context={linkRef} />
			</section>
		</Wrapper>
	);
};

export default Root;

const Wrapper = styled.div`
  position: relative;
  background-color: #1c1d1f;
  width: 100%;
  min-width: 100% !important;

  .nav-container {
    width: 100%;
    height: var(--nav-height);
    border-bottom: 1px solid gray;
  }
  nav {
    margin: auto;
    display: flex;
    height: 3rem;
    color: white;
    align-items: center;
    width: 95vw;
    justify-content: space-between;
  }

  .title {
    margin: auto;
    height: 100%;
    font-size: calc(1.25rem + 0.390625vw) !important;
    line-height: 3rem;
  }

  section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: auto;
    display: grid;
    width: 100%;
    background-color: #1c1d1f;
  }
  a {
    text-decoration: none;
    color: lightgray;
    font-size: calc(1rem + 0.390625vw) !important;
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
    display: flex;
  }
  .logo-container {
    display: none;
  }
  @media (max-width: 600px) {
    .powered-by {
      display: none;
    }
    .logo-container {
      height: 100%;
      width: fit-content;
      align-content: center;
      display: inline;
      .logo {
        height: 70%;
      }
    }
  }
`;
