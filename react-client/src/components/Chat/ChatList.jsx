import React, { useState, useMemo } from "react";
import ChatListItem from "./ChatListItem";

//TODO -- before mapping the chatList filter partner out

const ChatList = ({ pair, onChangePartner }) => {
  const [newChat, setNewChat] = useState(false);

  const allChats = useMemo(() => {}, [newChat]); // use api to get all chats

  return (
    <section className="chat-list">
      <div className="chat-list__add-chat">
        <h2>Chats</h2>
        <span className="material-symbols-outlined btn btn__new-chat btn--purple">
          add_circle
        </span>
      </div>
      <nav className="chat-list__nav">
        <ul>
          {allChats.map((item) => {
            return (
              <ChatListItem
                key={item.username}
                username={item.username}
                snippet={item.snippet}
                timestamp={item.timestamp}
                onChangePartner={onChangePartner}
              />
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default ChatList;
