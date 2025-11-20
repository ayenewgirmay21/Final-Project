import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  // Load saved authentication from localStorage
  const savedAuth = localStorage.getItem("auth") === "true";

  const [isAuthenticated, setIsAuthenticated] = useState(savedAuth);
  const [admin, setAdmin] = useState({});

  // Save auth state when changed
  useEffect(() => {
    localStorage.setItem("auth", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
