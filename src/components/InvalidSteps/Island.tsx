// libraries
import styled from "styled-components";

// assets
import island from "../../assets/images/islands.png";

// models, types, etc
import type { EmptyProps } from "../../models/EmptyProps.model";

const Island: React.FC<EmptyProps> = () => {
  return (
    <Wrapper className="inner-container">
      <img src={island} alt="" />
      <p>
        Answers must be must be connected to the rest of the grid. When there
        are islands of disconnected answers, different groups of disconnected
        cells will have
      </p>
    </Wrapper>
  );
};

export default Island;

const Wrapper = styled.div`
  img {
    margin-top: 1.5rem;
    width: 9rem;
    height: 9rem;
  }
  p {
    width: 90%;
    margin: 1.5rem auto 3rem auto;
  }
`;
