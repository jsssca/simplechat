import React, { useReducer } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const Chat = ({ username }) => {
  const [pair, dispatch] = useReducer(
    (pair, changePartner) => {
      //call api
      return {
        ...pair,
        partner: {
          username: "",
          avatar: "",
        },
      };
    },
    {
      username: "",
      partner: {
        username: "",
        avatar: "",
      },
    }
  );

  return (
    <main className="container">
      <ChatList partner={pair} onChangePartner={dispatch} />
      <ChatBox partner={pair} />
    </main>
  );
};

export default Chat;
