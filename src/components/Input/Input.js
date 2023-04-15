import React, { useContext, useState } from "react";
import "./Input.css";

import { BsFillSendFill, BsPlusCircle } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase";

const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  const handleSend = async () => {
    await updateDoc(doc(db, "chats", state.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    setText("");
  };

  return (
    <div className="input">
      <span>
        <BsPlusCircle size={30} color="#FFCAA2" />
        {/* <input type="file" id="file" style={{display: "none"}}/> */}
      </span>
      <input
        type="text"
        placeholder="Start Chatting..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span onClick={handleSend} className="icon">
        <BsFillSendFill size={25} color="#FECCA1" />
      </span>
    </div>
  );
};

export default Input;
