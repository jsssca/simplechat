import React from "react";
import Chat from "./components/Chat/Chat";

export default function App() {
  return (
    <>
      <header className="header">
        <div className="info-box info-box--col">
          <img
            src="images/avatar-4.png"
            alt="User Avatar"
            className="avatar avatar--big"
          />
          <h1>Apple Dave</h1>
        </div>
        <span className="material-symbols-outlined btn btn__logout btn--colourful">
          power_rounded
        </span>
      </header>
      <Chat />
    </>
  );
}

// TODO -- check is logged in? display chat: display login
