import { TbArrowBigLeftFilled } from "react-icons/tb";
import styled, { keyframes } from "styled-components";

interface ArrowLeftProps {
  top: number;
  left: number;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ top, left }) => {
  return (
    <Wrapper top={top} left={left}>
      <TbArrowBigLeftFilled id="myArrow" />
    </Wrapper>
  );
};

export default ArrowLeft;

const boxShadow = keyframes`
 0% {  font-size: 5.5rem; opacity: .9 }
 25% { font-size: 6rem; opacity: 0.75; }
 50% { font-size: 6.5; opacity: 0.5; }
 75% { font-size: 6rem; opacity: 0.75; }

`;

const Wrapper = styled.div<{ top: number; left: number }>`
  z-index: 99999;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
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
