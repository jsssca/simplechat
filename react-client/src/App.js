import React, { useState, useEffect, useRef } from "react";
import Chat from "./components/Chat/Chat";
import useAppStateContext, { AppContext } from "./state";
import { login, BASE_URL, logout } from "./api";
import { io } from "socket.io-client";

const DEMO_USER = {
  username: "Lettuce",
  password: "password",
};

// TODO -- Login Component!!
export default function App() {
  const [state, dispatch] = useAppStateContext();

  const socket = useRef();

  const [user, setUser] = useState({
    username: "",
    avatar: "",
  });

  useEffect(() => {
    login(DEMO_USER.username, DEMO_USER.password).then((u) => {
      setUser({
        username: u.username,
        avatar: u.avatar,
      });
    });
  }, []);

  useEffect(() => {
    if (user) {
      socket.current = io(BASE_URL);
      socket.current.emit("add-user", user.username);
    }
  }, [user]);

  const onLogout = () => {
    logout().then(() => {
      dispatch({
        type: "CLEAR",
      });
      setUser({
        username: "",
        avatar: "",
      });
    });
  };

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
        <span
          className="material-symbols-outlined btn btn__logout btn--colourful"
          onClick={onLogout}
        >
          power_rounded
        </span>
      </header>
      <Chat socket={socket} username={user.username} />
    </AppContext.Provider>
  );
}
