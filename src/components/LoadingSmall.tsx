import styled, { keyframes } from "styled-components";

const LoadingSmall: React.FC = () => {
	return (
		<Wrapper>
			<div className="loading-container">
				<div className="loading" />
			</div>
		</Wrapper>
	);
};
export default LoadingSmall;

const spinnerAnimation = keyframes`
     to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  width: auto;

  .loading-container {
    height: 100%;
    display: grid;
    margin: auto;
    place-content: center;
    width: 100%;

    .loading {
      margin: auto;
      color: white;
      width: 1.25rem;
      height: 1.25rem;
      border: 3px solid white;
      border-radius: 50%;
      border-top-color: #1c1d1f;
      animation: ${spinnerAnimation} 2s linear infinite;
    }
  }
`;
