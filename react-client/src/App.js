import React, { useState, useEffect } from "react";
import Chat from "./components/Chat/Chat";
import useAppStateContext, { AppContext } from "./state";
import { login } from "./api";

const DEMO_USER = {
  username: "Lettuce",
  password: "password",
};

export default function App() {
  const [user, setUser] = useState({
    username: "",
    avatar: "",
  });

  useEffect(() => {
    const u = login(DEMO_USER.username, DEMO_USER.password);
    setUser(u);
  }, []);

  const [state, dispatch] = useAppStateContext();

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <header className="header">
        <div className="info-box info-box--col">
          <img
            src={`/images/${user.avatar}`}
            alt="User Avatar"
            className="avatar avatar--big"
          />
          <h1>{user.username}</h1>
        </div>
        <span className="material-symbols-outlined btn btn__logout btn--colourful">
          power_rounded
        </span>
      </header>
      <Chat />
    </AppContext.Provider>
  );
}
