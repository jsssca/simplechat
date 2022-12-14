import React, { useEffect, useRef } from "react";
import Chat from "../Chat/Chat";
import useAppStateContext, { AppContext } from "../../state";
import { BASE_URL, logout } from "../../api";
import { io } from "socket.io-client";

export default function Dashboard({ user, onLogout }) {
  const [state, dispatch] = useAppStateContext(); // state should be available across the component

  const socket = useRef();

  useEffect(() => {
    socket.current = io(BASE_URL);
    socket.current.emit("add-user", user.username);
  }, []); // user?

  // Logs user out by clearing the state and removing user token from session storage
  const handleOnLogout = () => {
    logout().then(() => {
      dispatch({
        type: "CLEAR",
      });
      onLogout();
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
          onClick={handleOnLogout}
        >
          power_rounded
        </span>
      </header>
      <Chat socket={socket} username={user.username} />
    </AppContext.Provider>
  );
}
