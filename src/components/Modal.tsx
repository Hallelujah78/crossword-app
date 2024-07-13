// react
import { useRef, type ComponentPropsWithoutRef } from "react";

// third party

import styled from "styled-components";

// utils

// data

// components

// state

// hooks
import useTrapFocus from "../hooks/useTrapFocus";
// import type { Steps } from "../state/walkthroughSteps";
//

// models

// assets

interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }: ModalProps) => {
  const selfRef = useRef<HTMLDivElement>(null);
  useTrapFocus(selfRef);

  const closeInfo = () => {
    closeModal();
  };

  return (
    <Wrapper ref={selfRef} data-testid="information">
      <div className="modal">
        <div className="info-container">
          <h1>Whoops! Invalid Grid...</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis,
            odit!
          </p>
        </div>
        <div className="button-container">
          <button onClick={closeInfo} type="button">
            Exit
          </button>
          <button onClick={closeInfo} type="button">
            Disable Warnings
          </button>
        </div>
      </div>

      {/* {renderContent()} */}
    </Wrapper>
  );
};
export default Modal;

const Wrapper = styled.div`
  top: 0rem;
  left: 0rem;
  position: absolute;
  font-size: calc(1rem + 0.390625vw);
  text-align: center;
  z-index: 9999;
  height: calc(100vh - var(--nav-height));
  width: 100%;
  display: grid;
  place-content: center;
  .modal {
    display: grid;
    place-content: center;
    width: 40vw;
    height: 40vh;
    border-radius: 1rem;
    background: var(--primary-400);
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
  .info-container {
    p {
      line-height: 2rem;
    }
  }
`;
