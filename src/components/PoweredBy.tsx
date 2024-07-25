import { RiOpenaiFill } from "react-icons/ri";
import styled from "styled-components";

const PoweredBy = () => {
  return (
    <Wrapper className="powered-by">
      <h1>Powered by OpenAI</h1>
      <RiOpenaiFill className="ai-icon" />
    </Wrapper>
  );
};
export default PoweredBy;

const Wrapper = styled.div`
  color: white;
  position: absolute;
  height: var(--nav-height);
  line-height: 3rem;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  h1 {
    display: inline-block;
    font-size: calc(0.75rem + 0.390625vw);
  }
  .ai-icon {
    vertical-align: middle;
    line-height: 3rem;
    font-size: calc(1rem + 0.390625vw);
    margin-left: 0.5rem;
  }
`;
