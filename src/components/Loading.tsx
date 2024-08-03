import { RiOpenaiFill } from "react-icons/ri";
import styled, { keyframes } from "styled-components";
const Loading: React.FC = () => {
  return (
    <Wrapper>
      <div className="loading-container">
        <div className="loading" />
        <div className="powered-by">
          <h1>
            Fetching clues from OpenAI
            <span>
              <RiOpenaiFill className="ai-icon" />
            </span>
          </h1>
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
  width: 100%;
  max-width: 100%;

  .loading-container {
    height: 100%;
    display: grid;
    margin: auto;
    place-content: center;
    width: 100%;

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
      align-items: center;
      width: fit-content;

      h1 {
        font-size: calc(1rem + 0.390625vw);
        text-align: left;
        span {
          height: 100%;
        }
      }
      .ai-icon {
        margin-left: 0.5rem;
        vertical-align: middle;
        font-size: calc(1rem + 0.390625vw);
      }
    }
  }
`;
