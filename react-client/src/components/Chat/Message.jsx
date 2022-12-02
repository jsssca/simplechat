import React from "react";

const Message = ({ origin, content, timestamp }) => {
  return (
    <div
      className={
        origin === "user" ? "msg msg__current-user msg--right" : "msg msg--left"
      }
    >
      <div>
        <p className={origin === "user" ? "msg--blue" : "msg--white"}>
          {content}
        </p>
        <span className="time">{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;
