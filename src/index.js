import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./theme.css";
import store from "./store";
import router from "@router/index";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
  // <App />
  // </React.StrictMode>
);
