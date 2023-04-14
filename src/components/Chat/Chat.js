import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { BsFillSendCheckFill, BsPlusCircle } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const {data} = useContext(ChatContext);
  console.log(data,'[]]');

  useEffect(() => {
    const getChats = () => {
      const unSubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unSubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {Object.entries(chats)?.map((chat) => (
          <div className="chat" key={chat[0]}>
            <div className="chat-head">
              <img src={chat[1].userInfo.photoURL} alt="avatar" />
              <span>{chat[1].userInfo.displayName}</span>
            </div>
            <div className="chat-body">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>

            <div className="chat-foot">
              <span>
                <BsPlusCircle size={30} color="white" />
              </span>
              <input type="text" placeholder="Start Chatting..." />
              <span>
                <BsFillSendCheckFill size={30} color="white" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
