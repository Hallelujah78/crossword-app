// react
import {
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MutableRefObject,
} from "react";

// third party

import styled from "styled-components";
import Button from "../components/Button";
// utils

// data

// components

// state

// hooks
import useTrapFocus from "../hooks/useTrapFocus";
import type { Steps } from "../state/walkthroughSteps";

// models

// assets

interface InformationProps extends ComponentPropsWithoutRef<"div"> {
  myRefs: MutableRefObject<HTMLElement[]>;
  close: () => void;
  steps: Steps;
  isVisible: boolean;
}

const Information: React.FC<InformationProps> = ({
  myRefs,
  close,
  steps,
}: InformationProps) => {
  const [currStep, setCurrStep] = useState(0);
  const selfRef = useRef<HTMLDivElement>(null);
  useTrapFocus(selfRef);

  const closeInfo = () => {
    setCurrStep(0);
    close();
  };

  const renderStep = () => {
    const currStepId = steps[currStep].id;
    const currEl = myRefs.current.find((el) => {
      return el.classList.contains(currStepId);
    });
    let top = 0;
    let left = 0;
    let height = 0;
    let width = 0;
    console.log(currEl);
    if (currEl) {
      top = currEl.getBoundingClientRect().top;
      height = currEl.getBoundingClientRect().height;
      width = currEl.getBoundingClientRect().width;
      left = currEl.getBoundingClientRect().right;
    }

    const { component: Arrow } = steps[currStep];
    if (Arrow && top && left) {
      return <Arrow top={top} left={left} height={height} width={width} />;
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
