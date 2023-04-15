import React, { useContext, useEffect, useState } from "react";
import "./Messages.css";
import Message from "../Message/Message";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(ChatContext);

  useEffect(() => {
    const unSubscribe = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSubscribe();
    };
  }, [state.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
