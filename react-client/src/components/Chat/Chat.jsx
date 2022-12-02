import React from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { useAppState } from "../../state";

const Chat = () => {
  const [state, dispatch] = useAppState();

  return (
    <main className="container">
      <ChatList />
      {state.partner.username ? <ChatBox /> : ""}
    </main>
  );
};

export default Chat;
