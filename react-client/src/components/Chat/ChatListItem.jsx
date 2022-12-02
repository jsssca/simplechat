import React from "react";
import { useAppState } from "../../state";
import { getMessages } from "../../api";

const ChatListItem = ({ username, avatar, snippet, timestamp }) => {
  const [state, dispatch] = useAppState();

  // When a new chat-partner is selected, the state is updated
  const handleClick = () => {
    getMessages(username).then((x) => {
      dispatch({
        type: "SET_PARTNER",
        payload: {
          partner: {
            username: username,
            avatar: avatar,
          },
          messages: x,
        },
      });
    });
  };

  return (
    <li className="chat-list__item" onClick={handleClick}>
      <div className="info-box info-box--row">
        <img
          src={`/images/${avatar}`}
          alt="avatar"
          className="avatar avatar--small"
        />
        <h3>{username}</h3>
        <span className="time">{timestamp}</span>
      </div>
      <p>{snippet}</p>
    </li>
  );
};

export default ChatListItem;
