import React from "react";

const Message = ({ userMessage, content, timestamp }) => {
  return (
    <div
      className={
        userMessage ? "msg msg__current-user msg--right" : "msg msg--left"
      }
    >
      <div>
        <p className={userMessage ? "msg--blue" : "msg--white"}>{content}</p>
        <span className="time">{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;
