import React, { useEffect, useState } from "react";
import { useAppState } from "../../state";
import ChatListItem from "./ChatListItem";
import { getChats, getUsers } from "../../api";
import { getChatTime } from "../../utils";

const ChatList = ({ username }) => {
  const [state, dispatch] = useAppState();

  // fetches all of the current user's conversations
  useEffect(() => {
    getChats().then((x) => {
      dispatch({ type: "ADD_CHATS", payload: x });
    });
  }, []);

  const chatList = state.chats;

  const partner = state.partner.username; // current user's chat-partner

  // removes the current chat between the current user and partner from the chat list (this is displayed adjacent to the ChatList component)
  const chats = chatList.filter((chat) => chat.user.username !== partner);

  // show all user or all current user's chats
  const [isShown, setIsShown] = useState(false);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers().then((x) => {
      setAllUsers(x);
    });
  }, []);

  const handleClick = () => {
    // toggle shown state
    setIsShown((current) => !current);
  };

  const users = allUsers.filter((u) => u.username !== username);

  return (
    <section className="chat-list">
      <div className="chat-list__add-chat">
        <h2>{isShown ? "Users" : "Chats"}</h2>
        <span
          className="material-symbols-outlined btn btn__new-chat btn--purple"
          onClick={handleClick}
        >
          {isShown ? "cancel" : "add_circle"}
        </span>
      </div>
      <nav className="chat-list__nav">
        <ul>
          {isShown
            ? users.map((u) => {
                return (
                  <ChatListItem
                    key={u.username}
                    username={u.username}
                    avatar={u.avatar}
                  />
                );
              })
            : chats.map((item) => {
                return (
                  <ChatListItem
                    key={item.user.username}
                    username={item.user.username}
                    avatar={item.user.avatar}
                    snippet={item.snippet}
                    timestamp={getChatTime(item.timestamp)}
                  />
                );
              })}
        </ul>
      </nav>
    </section>
  );
};

export default ChatList;
