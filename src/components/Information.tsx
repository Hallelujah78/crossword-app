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
  isVisible: boolean;
  isMuted: boolean;
}

const Information: React.FC<InformationProps> = ({ close }) => {
  const selfRef = useRef<HTMLDivElement>(null);
  useTrapFocus(selfRef);

  const closeInfo = () => {
    close();
  };

  return (
    <Wrapper ref={selfRef} data-testid="information">
      <div className="modal">
        <button
          type="button"
          data-testid="close-info"
          onClick={() => {
            closeInfo();
          }}
          aria-label="close information"
          className="close"
        >
          <FaTimes />
        </button>
        <div className="credit-container">
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
  font-size: calc(1rem + 0.390625vw);
  text-align: center;
  z-index: 100;
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  .modal {
    display: grid;
    place-content: center;
    width: 90vw;
    height: 90vh;
    border-radius: 1rem;
    background: black;
    color: white;
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

  .close {
    display: grid;
    color: white;
    background-color: transparent;
    border: none;
    font-size: calc(1.25rem + 0.390625vw);
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .social-container {
    .icon-container {
      .icon {
        text-decoration: none;
        color: white;
        cursor: pointer;
      }
      max-width: 80%;
      margin: auto;
      display: flex;
      font-size: calc(2.5rem + 0.390625vw);
      justify-content: space-evenly;
    }
    position: relative;
    margin-top: 5rem;
  }
`;
