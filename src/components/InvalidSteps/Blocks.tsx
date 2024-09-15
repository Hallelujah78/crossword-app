// libraries
import styled from "styled-components";

// assets
import blocks from "../../assets/images/blocks.png";

// models, types, etc
import type { EmptyProps } from "../../models/EmptyProps.model";

const Blocks: React.FC<EmptyProps> = () => {
  return (
    <Wrapper className="inner-container">
      <img src={blocks} alt="" />
      <p>
        The method used to generate answers for the grid will create nonsense
        words if there are answers placed side-by-side without a gap of dark
        cells. The above grid can be put into a valid state by toggling the cell
        below 2 Down to a void.
      </p>
    </Wrapper>
  );
};

export default Blocks;

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
