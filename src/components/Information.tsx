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
import type { Steps } from "../models/Steps.model";
//

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
    const side = steps[currStep].attach;
    if (currEl) {
      top = currEl.getBoundingClientRect().top;
      height = currEl.getBoundingClientRect().height;
      width = currEl.getBoundingClientRect().width;
      left = currEl.getBoundingClientRect().left;
    }

    const { component: Arrow } = steps[currStep];
    if (Arrow) {
      return (
        <Arrow
          top={top}
          left={left}
          height={height}
          width={width}
          side={side}
        />
      );
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
          {typeof steps[currStep].content === "function"
            ? steps[currStep].content({})
            : steps[currStep].content}
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
  top: -3rem;
  left: 0rem;
  position: absolute;
  font-size: calc(1rem + 0.390625vw);
  text-align: center;
  z-index: 9999;
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  .modal {
    padding: 2rem;
    display: grid;
    place-content: center;
    width: 40vw;
    height: auto;
    border-radius: 1rem;
    background: var(--primary-400);
    color: white;
    position: relative;
    p {
      a {
        background-color: transparent;
        text-decoration: none;
        color: white;
        border-bottom: 1px solid gray;
      }
    }
    h1 {
      margin-top: 1rem;
    }
    button {
      margin-bottom: 1rem !important;
    }
  }

  .info-container {
    p {
      line-height: 2rem;
    }
  }
`;
