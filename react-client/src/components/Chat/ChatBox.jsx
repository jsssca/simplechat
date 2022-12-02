import React, { useState, useEffect } from "react";
import { useAppState } from "../../state";
import Message from "./Message";

const ChatBox = () => {
  const [state, dispatch] = useAppState();

  const partner = state.partner; // current user's chat-partner

  const messages = state.messages; // messages between the current user and partner

  return (
    <section className="chat">
      <div className="chat__label">
        <img
          src={`/images/${partner.avatar}`}
          alt="avatar"
          className="avatar avatar--med"
        />
        <h3>{partner.username}</h3>
      </div>
      <div className="chat__box">
        {messages.map((msg) => {
          return (
            <Message
              key={msg.id}
              origin={msg.from === partner.username ? "partner" : "user"}
              content={msg.message}
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
