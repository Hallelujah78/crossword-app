// react
import React from "react";
import ReactDOM from "react-dom/client";

// style
import GlobalStyle from "./styles/GlobalStyles.ts";

// components
import Editor from "./routes/Editor.tsx";

// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Editor />,
      },
      {
        path: "/solver",
        element: <Solve />,
      },
    ],
  },
]);

import Root from "./routes/Root.tsx";
import Solve from "./routes/Solve.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
const docRoot = document.getElementById("root");
if (docRoot) {
  ReactDOM.createRoot(docRoot).render(
    <React.StrictMode>
      <GlobalStyle />

      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
