import type { IconType } from "react-icons";
import {
	TbArrowBigDownFilled,
	TbArrowBigLeftFilled,
	TbArrowBigRightFilled,
	TbArrowBigUpFilled,
} from "react-icons/tb";

import styled, { keyframes } from "styled-components";
import { Side } from "../models/Side.model";

export interface PositionProps {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
	height: number;
	width: number;
	side?: Side;
}

const Arrow: React.FC<PositionProps> = ({ top, left, height, width, side }) => {
	if (!top) {
		top = 0;
	}
	if (!left) {
		left = 0;
	}
	let xval = 0;
	let yval = 0;
	let transformx = "0%";
	let transformy = "0%";
	let Component: IconType = TbArrowBigLeftFilled;
	switch (side) {
		case Side.BOTTOM:
			Component = TbArrowBigUpFilled;
			xval = left ? left + width / 2 : 0;
			transformx = "-50%";
			yval = top + height;
			break;
		case Side.TOP:
			Component = TbArrowBigDownFilled;
			xval = left ? left + width / 2 : 0;
			transformx = "-50%";
			yval = top;
			transformy = "-100%";
			break;
		case Side.RIGHT:
			Component = TbArrowBigLeftFilled;
			xval = left ? left + width : 0;
			yval = top + height / 2;
			transformy = "-50%";
			break;
		case Side.LEFT:
			Component = TbArrowBigRightFilled;
			xval = left ? left : 0;
			transformx = "-100%";
			yval = top + height / 2;
			transformy = "-50%";
			break;
		default:
			Component = TbArrowBigLeftFilled;
	}

	return (
		<Wrapper
			$xval={xval}
			$yval={yval}
			$transformx={transformx}
			$transformy={transformy}
		>
			<Component id="myArrow" />
		</Wrapper>
	);
};

export default Arrow;

const boxShadow = keyframes`
 0% {   opacity: .9 }
 25% { opacity: 0.75; }
 50% {  opacity: 0.5; }
 75% {  opacity: 0.75; }

`;

const Wrapper = styled.div<{
	$xval: number;
	$yval: number;
	$transformx: string;
	$transformy: string;
}>`
  z-index: 99999;
  position: absolute;
  top: ${(props) => props.$yval}px;

  left: ${(props) => props.$xval}px;

  transform: translate(
    ${(props) => props.$transformx},
    ${(props) => props.$transformy}
  );
  #myArrow {
    animation-name: ${boxShadow};
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    left: 0;
    font-size: 5rem;
    z-index: 99999;
    color: red;
  }
`;
