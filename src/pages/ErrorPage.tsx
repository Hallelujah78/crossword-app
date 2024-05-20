import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <Wrapper id="error-page">
        <div className="center-content">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>
              {error.status} {error.statusText}
            </i>
          </p>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper id="error-page">
      <div className="center-content">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message || "Unknown Error"}</i>
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #1c1d1f;
  color: white;
  height: 100vh;
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
