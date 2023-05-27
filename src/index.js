import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import "./styles/Tutor.css";
import { AuthContextProvider } from "./context/AuthContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);