import React from "react";
import ReactDOM from "react-dom/client";

import GlobalStyle from "./styles/GlobalStyles.ts";
import Editor from "./routes/Editor.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editor",
    element: <Editor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/solve",
    element: <Editor />,
    errorElement: <ErrorPage />,
  },
]);

import Root from "./routes/Root.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
