import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();

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

  const onWheel = (e) => {
    e.preventDefault();
    const container = document.getElementById("dashboard");
    const containerScrollPosition =
      document.getElementById("dashboard").scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
      behaviour: "smooth",
    });
  };

  const handleSelect = (user, id) => {
    dispatch({
      type: "CHANGE_USER",
      payload: user,
    });

    navigate(`/chat/${id}`);
  };

  return (
    <div className="dashboard" id="dashboard" onWheel={onWheel}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="profile"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo, chat[0])}
          >
            <img src={chat[1].userInfo.photoURL} alt="photoURL" />
            <span className="dot"></span>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
