// react
import React from "react";
import ReactDOM from "react-dom/client";

// style
import GlobalStyle from "./styles/GlobalStyles.ts";
import "react-toastify/dist/ReactToastify.css";

// components
import Editor from "./routes/Editor.tsx";

// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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

const docRoot = document.getElementById("root");
if (docRoot) {
  ReactDOM.createRoot(docRoot).render(
    <React.StrictMode>
      <ToastContainer />
      <GlobalStyle />

      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
