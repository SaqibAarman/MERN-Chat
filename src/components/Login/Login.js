import React from "react";
import "./Login.css";
import { auth, db, faceBookProvider, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FaApple } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider).then(async (data) => {
        // Add user To FireStore DB
        await setDoc(doc(db, "users", data.user.uid), {
          uid: data.user.uid,
          displayName: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
          provider: data.user.providerData[0].providerId,
        });

        // Create Empty User Chats On FireStore
        await setDoc(doc(db, "userChats", data.user.uid), {});
      });

      navigate("/");
    } catch (error) {
      // setError(true);
      console.log(error);
    }
  };

  const handleFaceBookLogin = () => {
    try {
      signInWithPopup(auth, faceBookProvider).then(async (data) => {
        // console.log(data.user);
        // Add user To FireStore DB
        await setDoc(doc(db, "users", data.user.uid), {
          uid: data.user.uid,
          displayName: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
          provider: data.user.providerData[0].providerId,
        });

        // Create Empty User Chats On FireStore
        await setDoc(doc(db, "userChats", data.user.uid), {});

        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <span className="btn" onClick={handleGoogleSignIn}>
          <BsGoogle size={20} className="icon" />
          Login With Google
        </span>

        <span className="btn" onClick={handleFaceBookLogin}>
          <BsFacebook size={20} className="icon" />
          Login With Facebook
        </span>

        <span className="btn">
          <FaApple size={20} className="icon" />
          Login With Apple
        </span>
      </div>
    </div>
  );
};

export default Login;
