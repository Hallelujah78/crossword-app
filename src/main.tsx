
import React from "react";
import ReactDOM from "react-dom/client";


import GlobalStyle from "./styles/GlobalStyles.ts";
import "react-toastify/dist/ReactToastify.css";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import Editor from "./routes/Editor.tsx";

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
			<ToastContainer
position="top-right"
autoClose={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
theme="light"
transition={Bounce}
/>
			<GlobalStyle />

			<RouterProvider router={router} />
		</React.StrictMode>,
	);
}
