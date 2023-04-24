import React from "react";
import { format } from "timeago.js";
export default function Message({ message, own }) {
  return (
    <>
      {" "}
      {own ? (
        <div className="messages__me">
          <div className="messages__me-message">
            <div className="messages__me-messageContent">{message.text}</div>
            <span>{format(message.createdAt)}</span>
          </div>
          <div className="messages__me-img">
            <img src="/images/profile.png" alt="" />
          </div>
        </div>
      ) : (
        <div className="messages__sender">
          <div className="messages__sender-img">
            <img src="/images/profile.png" alt="" />
          </div>
          <div className="messages__sender-message">
            <div className="messages__sender-messageContent">
              {message.text}
            </div>
            <span>{format(message.createdAt)}</span>
          </div>
        </div>
      )}
    </>
  );
}
