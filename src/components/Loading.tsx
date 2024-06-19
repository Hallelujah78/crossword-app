import styled, { keyframes } from "styled-components";
const Loading: React.FC = () => {
  return (
    <Wrapper>
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    </Wrapper>
  );
};
export default Loading;

const spinnerAnimation = keyframes`
     to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  .loading-container {
    height: 100%;
    display: grid;
    place-content: center;
  }
  .loading {
    color: white;
    font-size: 22px;
    width: 6rem;
    height: 6rem;
    border: 5px solid white;
    border-radius: 50%;
    border-top-color: #1c1d1f;
    animation: ${spinnerAnimation} 2s linear infinite;
  }
`;
