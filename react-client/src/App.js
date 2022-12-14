import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import Login from "./components/Login/Login";
import { useToken } from "./hooks";

function App() {
  const { token, setToken, clearToken } = useToken();

  // show Login if a user token has not been saved
  if (!token) {
    return <Login setToken={setToken} />;
  }

  // show user dashboard when user has successfully logged in and their token has been saved
  return <Dashboard user={token.user} onLogout={clearToken} />;
}

export default App;
