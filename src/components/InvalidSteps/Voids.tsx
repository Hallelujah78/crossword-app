// libraries
import styled from "styled-components";

// assets
import voids from "../../assets/images/voids.png";

// models, types, etc
import type { EmptyProps } from "../../models/EmptyProps.model";

const Voids: React.FC<EmptyProps> = () => {
  return (
    <Wrapper className="inner-container">
      <img src={voids} alt="" />
      <p>
        If an entire side of the grid is made up of voids (dark cells), the grid
        is invalid. In this case, the void cells will have a red border to
        indicate that the grid is not a valid crossword grid.
      </p>
    </Wrapper>
  );
};

export default Voids;

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
