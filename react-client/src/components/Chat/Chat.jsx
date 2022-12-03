import React from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { useAppState } from "../../state";

const Chat = ({ socket, username }) => {
  const [state, dispatch] = useAppState();

  return (
    <main className="container">
      <ChatList username={username} />
      {state.partner.username ? <ChatBox socket={socket} /> : ""}
    </main>
  );
};

export default Chat;
