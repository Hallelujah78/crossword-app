import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import React from "react";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.status || error.statusText}</i>
        </p>
      </div>
    );
  }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message || "Unknown Error"}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
