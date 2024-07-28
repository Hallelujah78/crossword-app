import type React from "react";
import styled from "styled-components";

interface ErrorProps {
  error: {
    message?: string;
    status?: string;
    error?: { message?: string; type?: string };
  };
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Wrapper id="error-page">
      <div className="center-content">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {error ? (
              <>
                <i>
                  {error?.error?.message
                    ? error?.error?.message
                    : error?.message}
                </i>
                <br />
                <i>
                  {error?.error?.type} {error?.status}
                </i>
              </>
            ) : (
              "Unknown Error"
            )}
          </i>
          <br />
          <button type="button" onClick={() => window.location.reload()}>
            Reload Page
          </button>
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
      font-size: 2.25rem;
      color: rgb(185, 69, 79);
    }
  }
  button {
    margin-top: 2rem !important;
    padding: 0.75rem 1.25rem !important;
    width: fit-content !important;
  }
`;

export default ErrorPage;
