import { RiOpenaiFill } from "react-icons/ri";
import styled, { keyframes } from "styled-components";
const Loading: React.FC = () => {
  return (
    <Wrapper>
      <div className="loading-container">
        <div className="loading" />
        <div className="powered-by">
          <h1>Fetching clues from OpenAI</h1>
          <RiOpenaiFill className="ai-icon" />
        </div>
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
    .loading {
      margin: auto;
      color: white;
      font-size: 22px;
      width: 6rem;
      height: 6rem;
      border: 5px solid white;
      border-radius: 50%;
      border-top-color: #1c1d1f;
      animation: ${spinnerAnimation} 2s linear infinite;
    }
    .powered-by {
      margin-top: 2rem;
      display: flex;
      color: white;
      font-size: 2rem;
      .ai-icon {
        margin-left: 1rem;
      }
    }
  }
`;
