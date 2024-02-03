import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { sum } from "@/test.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(sum(5, 7));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
