// react
import { useRef, useState, type ComponentPropsWithoutRef } from "react";

// third party

import styled from "styled-components";
import Button from "../components/Button";
// utils

// data

// components

// state
import steps from "../state/walkthroughSteps";

// hooks
import useTrapFocus from "../hooks/useTrapFocus";
import type { Steps } from "../state/walkthroughSteps";
import ArrowLeft from "./ArrowLeft";

// models

// assets

interface InformationProps extends ComponentPropsWithoutRef<"div"> {
  myRefs;
  close: () => void;
  steps: Steps;
  top: number;
  left: number;
  isVisible: boolean;
}

const Information: React.FC<InformationProps> = ({
  myRefs,
  close,
  steps,
  top,
  left,
}: InformationProps) => {
  const [currStep, setCurrStep] = useState(0);
  const selfRef = useRef<HTMLDivElement>(null);
  useTrapFocus(selfRef);

  const closeInfo = () => {
    setCurrStep(0);
    close();
  };

  const renderStep = () => {
    // using myRefs.current[currStep], we can derive the top
    // and left values
    // we don't need position state in Grid to be passed down to info
    const { component: Arrow } = steps[currStep];
    if (Arrow) {
      return <Arrow top={top} left={left} />;
    }
  };

  const updateCurrStep = (index: 1 | -1) => {
    if (
      (index === -1 && currStep > 0) ||
      (index === 1 && currStep < steps.length - 1)
    ) {
      setCurrStep((prev) => prev + index);
    }
  };

  return (
    <Wrapper ref={selfRef} data-testid="information">
      <div className="modal">
        <div className="info-container">
          <h1>{steps[currStep].title}</h1>
          <p>{steps[currStep].text}</p>
        </div>
        <div className="button-container">
          {steps[currStep].buttons.map((button) => {
            return (
              <Button
                key={button.buttonType}
                {...button}
                close={closeInfo}
                updateCurrStep={updateCurrStep}
              />
            );
          })}
        </div>
      </div>

      {renderStep()}
    </Wrapper>
  );
};
export default Information;

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
