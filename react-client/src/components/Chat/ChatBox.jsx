import React, { useState, useEffect } from "react";
import Message from "./Message";

//TODO -- will eventually use socketio

const ChatBox = ({ pair }) => {
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    // call api to get converstation between pair.username and pair.partner.username, then setConversation
  });

  return (
    <section className="chat">
      <div className="chat__label">
        <img
          src={pair.partner.avatar}
          alt="avatar"
          className="avatar avatar--small"
        />
        <h3>{pair.partner.username}</h3>
      </div>
      <div className="chat__box">
        {conversation.map((msg) => {
          return (
            <Message
              key={msg.id}
              userMessage={msg.username === pair.username}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          );
        })}
      </div>
      <div>
        <form className="form form__send">
          <input
            type="text"
            name="message"
            className="form__input form__input--large"
          />
          <button type="submit" className="btn btn__send btn--colourful">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatBox;
