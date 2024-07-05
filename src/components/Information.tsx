// react
import { useRef } from "react";

// third party
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
// utils

// data

// components

// state

// hooks
import useTrapFocus from "../hooks/useTrapFocus";

// models

// assets

interface InformationProps {
  close: () => void;
}

const Information: React.FC<InformationProps> = ({ close }) => {
  const selfRef = useRef<HTMLDivElement>(null);
  useTrapFocus(selfRef);

  const closeInfo = () => {
    console.log("you clicked close!");
    close();
  };

  return (
    <Wrapper ref={selfRef} data-testid="information">
      <div className="modal">
        <button
          type="button"
          data-testid="close-info"
          onClick={closeInfo}
          aria-label="close information"
          className="close"
        >
          <FaTimes />
        </button>
        <div className="info-container">
          <h1>Info</h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit earum
          id beatae ullam dicta. Repellendus quidem vitae doloremque
          perspiciatis aut.
        </div>
      </div>
    </Wrapper>
  );
};
export default Information;

const Wrapper = styled.div`
  top: -3rem;
  left: 0;
  position: absolute;
  font-size: calc(1rem + 0.390625vw);
  text-align: center;
  z-index: 100;
  height: calc(100vh - 3rem);
  width: 100%;
  display: grid;
  place-content: center;
  .modal {
    display: grid;
    place-content: center;
    width: 40vw;
    height: 40vh;
    border-radius: 1rem;
    background: white;
    color: black;
    position: relative;
    p {
      margin: 3rem;
      a {
        background-color: transparent;
        text-decoration: none;
        color: white;
        border-bottom: 1px solid gray;
      }
    }
  }

  button.close {
    display: grid !important;
    color: black !important;
    background-color: transparent !important;
    border: none !important;
    font-size: calc(1.25rem + 0.390625vw) !important;
    cursor: pointer !important;
    position: absolute !important;
    top: 1rem !important;
    right: 1rem !important;
    width: fit-content !important;
  }
`;
