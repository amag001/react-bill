import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./theme.css";
import App from "./App";
import router from "@router/index";
import { RouterProvider } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // <App />
  // </React.StrictMode>
);
