import React, { useState, useRef, useEffect } from "react";
import { useAppState } from "../../state";
import Message from "./Message";
import { addMessage } from "../../api";
import { getChatTime } from "../../utils";

const ChatBox = ({ socket }) => {
  const [state, dispatch] = useAppState();

  const partner = state.partner; // current user's chat-partner

  const messages = state.messages; // messages between the current user and partner

  const [msg, setMsg] = useState("");

  const [msgArrival, setMsgArrival] = useState(null); // updated upon socket message received

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAddMessage = (message) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: message.id,
        from: message.from, // TODO -- this is an object id not a username
        timestamp: message.timestamp,
        message: message.message,
      },
    });
  };

  const handleUpdateChats = (message) => {
    dispatch({
      type: "UPDATE_CHATS",
      payload: {
        user: {
          username: partner.username,
          avatar: partner.avatar,
        },
        snippet: message.message,
        timestamp: message.timestamp,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      addMessage(partner.username, msg).then((m) => {
        socket.current.emit("send-msg", m);

        handleAddMessage(m); // update the state with the new message

        handleUpdateChats(m); // update chats with the new message

        setMsg("");
      });
    }
  };

  // receive new messages from socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (m) => {
        setMsgArrival(m);
      });
    }
  }, []);

  useEffect(() => {
    if (msgArrival) {
      handleAddMessage(msgArrival); // update the state with the new message

      handleUpdateChats(msgArrival); // update chats with the new message
    }
  }, [msgArrival]);

  // scrolls to the last message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
              timestamp={getChatTime(msg.timestamp)}
            />
          );
        })}
        <div ref={messagesEndRef} />
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
