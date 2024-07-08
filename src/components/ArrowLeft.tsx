import { TbArrowBigLeftFilled } from "react-icons/tb";
import styled, { keyframes } from "styled-components";

export interface ArrowLeftProps {
  top: number;
  left: number;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ top, left }) => {
  console.log("the top val for arrow left: ", top);
  return (
    <Wrapper top={top} left={left}>
      <TbArrowBigLeftFilled id="myArrow" />
    </Wrapper>
  );
};

export default ArrowLeft;

const boxShadow = keyframes`
 0% {   opacity: .9 }
 25% { opacity: 0.75; }
 50% {  opacity: 0.5; }
 75% {  opacity: 0.75; }

`;

const Wrapper = styled.div<{ top: number; left: number }>`
  z-index: 99999;
  position: absolute;
  top: ${(props) => props.top - 48}px;
  left: ${(props) => props.left}px;
  transform: translate(0, -25%);
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
