import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
// import { Link } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const { dispatch, data } = useContext(ChatContext);

  // console.log(data,'[]');

  useEffect(() => {
    async function getUsersList() {
      let filteredUser = [];
      const userRef = getDocs(collection(db, "users"));
      (await userRef).forEach((doc) => {
        if (currentUser.displayName !== doc.data().displayName) {
          filteredUser.push(doc.data());
        }
      });

      setUsers(filteredUser);
    }

    getUsersList();
  }, [currentUser]);

  const onWheel = (e) => {
    e.preventDefault();
    const container = document.getElementById("container");
    const containerScrollPosition =
      document.getElementById("container").scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
      behaviour: "smooth",
    });
  };

  // console.log(users); to={`/chat/${user.uid}`}

  const handleCreateChat = async (user) => {
    // console.log(userId,'ID');
    // Check Whether Group ( Chat In FireStore ) exists, if not Create
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));

      if (!res.exists()) {
        // Create User Chat In Chats Collection

        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // Create User Chats --> To get latest message and User Details With whom the current user chatting with

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        // To Update The User Collection TO filter out the already texted user and remove the card from the list of profiles.
        // await updateDoc(doc(db, "users", user.displayName), {
        //   chatStarted: true,
        // });
      }
      navigate(`/chat/${combineId}`);

      dispatch({
        type: "CHANGE_USER",
        payload: user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-container" id="container" onWheel={onWheel}>
      {users?.map((user) => (
        <div className="card" key={user.uid}>
          <div className="card-thumb">
            <img src={user.photoURL} alt="user-profile" />
          </div>

          <div className="content">
            <h2>{user.displayName}</h2>
            <span>{user.email !== null ? user.email : "No Email"}</span>

            <button
              onClick={() => handleCreateChat(user)}
              className="messageBtn"
            >
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
