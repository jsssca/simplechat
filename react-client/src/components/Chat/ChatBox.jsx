import React, { useState } from "react";
import { useAppState } from "../../state";
import Message from "./Message";
import { addMessage } from "../../api";

const ChatBox = ({ socket }) => {
  const [state, dispatch] = useAppState();

  const partner = state.partner; // current user's chat-partner

  const messages = state.messages; // messages between the current user and partner

  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      addMessage(partner.username, msg).then((m) => {
        socket.current.emit("send-msg", {
          to: partner.username,
          messages: msg,
        });

        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            id: m._id,
            from: m.from, // TODO -- this is an object id not a username
            timestamp: m.updatedAt,
            message: m.message.text,
          },
        });

        setMsg("");
      });
    }
  };

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
        <form onSubmit={handleSubmit} className="form form__send">
          <input
            type="text"
            name="message"
            className="form__input form__input--large"
            placeholder={`Send ${partner.username} a message...`}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
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
