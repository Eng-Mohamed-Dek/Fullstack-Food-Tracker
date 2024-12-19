import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FoodContextProvider } from "./context/FoodContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FoodContextProvider>
          <App />
          {/* this of that function  */}
        </FoodContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
