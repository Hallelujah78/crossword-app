// libraries
import styled from "styled-components";

// assets
import shortAnswer from "../../assets/images/short.png";

// models, types, etc
import type { EmptyProps } from "../../models/EmptyProps.model";

const TooShort: React.FC<EmptyProps> = () => {
  return (
    <Wrapper className="inner-container">
      <img src={shortAnswer} alt="" />
      <p>
        Crossword clue answers must be at least 3 letters long. When answers are
        too short, the cells of the answer have a red border.
      </p>
    </Wrapper>
  );
};

export default TooShort;

const Wrapper = styled.div`
  img {
    margin-top: 1rem;
    width: 9rem;
    height: 9rem;
  }
  p {
    margin: 1rem;
  }
`;
