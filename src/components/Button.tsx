import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	close: () => void;
	text: string;
	buttonType: string;
	updateCurrStep: (index: 1 | -1) => void;
	func?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	text,
	buttonType,
	id,
	close,
	updateCurrStep,
	func,
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
						: buttonType === "next"
							? updateCurrStep(1)
							: func
								? func()
								: () => {};
			}}
		>
			{text}
		</Wrapper>
	);
};

export default Button;

const Wrapper = styled.button``;
