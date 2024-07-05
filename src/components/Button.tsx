import styled from "styled-components";
import type { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  close: () => void;
  text: string;
  buttonType: string;
  updateCurrStep: (index: 1 | -1) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  buttonType,
  id,
  close,
  updateCurrStep,
}: ButtonProps) => {
  const exitModal = () => {
    close();
  };

  return (
    <Wrapper
      key={id}
      type="button"
      onClick={() => {
        buttonType === "cancel"
          ? exitModal()
          : buttonType === "back"
          ? updateCurrStep(-1)
          : updateCurrStep(1);
      }}
    >
      {text}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button``;
