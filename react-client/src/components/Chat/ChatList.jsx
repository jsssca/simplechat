import React from "react";
import { useEffect, useState } from "react";
import { useAppState } from "../../state";
import ChatListItem from "./ChatListItem";
import { getChats } from "../../api";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);

  // fetches all of the current user's conversations
  useEffect(() => {
    getChats().then((x) => {
      setChatList(x);
    });
  }, []);

  const [state, dispatch] = useAppState();

  const partner = state.partner.username; // current user's chat-partner

  // removes the current chat between the current user and partner from the chat list (this chat is displayed adjacent to the ChatList component)
  const chats = chatList.filter((chat) => chat.username !== partner);

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
          {chats.map((item) => {
            return (
              <ChatListItem
                key={item.username}
                username={item.username}
                avatar={item.avatar}
                snippet={item.snippet}
                timestamp={item.timestamp}
              />
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default ChatList;
