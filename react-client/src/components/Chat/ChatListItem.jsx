import React from "react";

const ChatListItem = ({
  username,
  avatar,
  snippet,
  timestamp,
  onChangePartner,
}) => {
  const handleItemClick = (event) => {
    const p = event.target.name;
    onChangePartner(p);
  };

  return (
    <li className="chat-list__item" onClick={handleItemClick} name={username}>
      <div className="info-box info-box--row">
        <img src={avatar} alt="avatar" className="avatar avatar--small" />
        <h3>{username}</h3>
        <span className="time">{timestamp}</span>
      </div>
      <p>{snippet}</p>
    </li>
  );
};

export default ChatListItem;
