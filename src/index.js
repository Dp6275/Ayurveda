import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ✅ Make sure this file exists and is imported correctly
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Performance measuring
reportWebVitals();
