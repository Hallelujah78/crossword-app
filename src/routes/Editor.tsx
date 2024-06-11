import styled from "styled-components";

// components
import Grid from "../components/Grid";

const Editor: React.FC = () => {
	return (
		<Wrapper>
			<Grid />
		</Wrapper>
	);
};

export default Editor;

const Wrapper = styled.div`
  height: calc(100vh - 3rem - 1px);
  position: relative;
  display: grid;
  place-content: center;
  max-width: 100%;
  background-color: #1c1d1f;
`;
