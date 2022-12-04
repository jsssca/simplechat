import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import Login from "./components/Login/Login";
import { useToken } from "./hooks";

function App() {
  const { token, setToken, clearToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Dashboard user={token.user} onLogout={clearToken} />;
}

export default App;
