import React, { useContext } from "react";
import "./Message.css";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  return (
    <div
      className={` message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.photoURL
              ? currentUser.photoURL
              : state.user.photoURL
          }
          alt="profile"
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
