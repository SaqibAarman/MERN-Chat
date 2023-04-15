import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
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

const Profile = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getUsersList() {
      let filteredUser = [];
      const userRef = getDocs(collection(db, "users"));
      (await userRef).forEach((doc) => {
        if (
          currentUser?.displayName !== doc.data().displayName &&
          !doc.data().chatStarted
        ) {
          filteredUser.push(doc.data());
        }
      });

      setUsers(filteredUser);
    }

    getUsersList();
  }, [currentUser?.displayName]);

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

  const handleUpdateUsers = async (user) => {
    // Here We are updating User To Remove Card Profile Once They Clicked and started to Chat
    await updateDoc(doc(db, "users", user.uid), {
      chatStarted: true,
    });

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
      }

      //   dispatch({
      //     type: "CHANGE_USER",
      //     payload: user,
      //   });

      //   navigate(`/chat/${combineId}`);
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
              onClick={() => handleUpdateUsers(user)}
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
