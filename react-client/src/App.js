import React, { useState, useEffect, useRef } from "react";
import Chat from "./components/Chat/Chat";
import useAppStateContext, { AppContext } from "./state";
import { login, BASE_URL } from "./api";
import { io } from "socket.io-client";

const DEMO_USER = {
  username: "Lettuce",
  password: "password",
};

export default function App() {
  const socket = useRef();

  const [user, setUser] = useState({
    username: "",
    avatar: "",
  });

  useEffect(() => {
    const u = login(DEMO_USER.username, DEMO_USER.password);
    setUser(u);
  }, []);

  useEffect(() => {
    if (user) {
      socket.current = io(BASE_URL);
      socket.current.emit("add-user", user.username);
    }
  }, [user]);

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
      <Chat socket={socket} />
    </AppContext.Provider>
  );
}
