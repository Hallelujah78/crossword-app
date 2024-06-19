import type React from "react";
import styled from "styled-components";

const ErrorPage: React.FC = ({ error }) => {
  return (
    <Wrapper id="error-page">
      <div className="center-content">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {error ? (
              <i>
                {error.error.message} {error.status}
              </i>
            ) : (
              "Unknown Error"
            )}
          </i>
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #1c1d1f;
  color: white;
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  .center-content {
    margin: auto;
    text-align: center;
    h1 {
      font-size: 3rem;
      line-height: 3rem;
      margin: 0.9rem;
    }
    p {
      margin: 0.9rem;

      font-size: 1.5rem;
    }
    i {
      margin: 0.9rem;

      font-size: 3rem;
      color: rgb(185, 69, 79);
    }
  }
`;

export default ErrorPage;
