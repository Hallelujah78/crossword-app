import {
  TbArrowBigLeftFilled,
  TbArrowBigRightFilled,
  TbArrowBigUpFilled,
  TbArrowBigDownFilled,
} from "react-icons/tb";
import type { IconType } from "react-icons";

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
  let xVal = 0;
  let yVal = 0;
  let transformX = "0%";
  let transformY = "0%";
  let Component: IconType = TbArrowBigLeftFilled;
  switch (side) {
    case Side.BOTTOM:
      Component = TbArrowBigUpFilled;
      xVal = left ? left + width / 2 : 0;
      transformX = "-50%";
      yVal = top + height;
      break;
    case Side.TOP:
      Component = TbArrowBigDownFilled;
      xVal = left ? left + width / 2 : 0;
      transformX = "-50%";
      yVal = top;
      transformY = "-100%";
      break;
    case Side.RIGHT:
      Component = TbArrowBigLeftFilled;
      xVal = left ? left + width : 0;
      yVal = top + height / 2;
      transformY = "-50%";
      break;
    case Side.LEFT:
      Component = TbArrowBigRightFilled;
      xVal = left ? left : 0;
      transformX = "-100%";
      yVal = top + height / 2;
      transformY = "-50%";
      break;
    default:
      Component = TbArrowBigLeftFilled;
  }

  return (
    <Wrapper
      top={top}
      left={left}
      height={height}
      width={width}
      xVal={xVal}
      yVal={yVal}
      transformX={transformX}
      transformY={transformY}
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
  top: number;
  left: number;
  height: number;
  width: number;
  xVal: number;
  yVal: number;
  transformX: string;
  transformY: string;
}>`
  z-index: 99999;
  position: absolute;
  top: ${(props) => props.yVal - 48}px;
  left: ${(props) => props.xVal}px;
  transform: translate(
    ${(props) => props.transformX},
    ${(props) => props.transformY}
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
