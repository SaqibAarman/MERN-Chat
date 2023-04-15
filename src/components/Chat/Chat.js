import React, { useContext } from "react";
import "./Chat.css";
import { ChatContext } from "../../context/ChatContext";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

const Chat = () => {
  const { state } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-head">
        <img src={state?.user?.photoURL} alt="avatar" />
        <span>{state?.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
