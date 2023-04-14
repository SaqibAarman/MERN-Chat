import React from "react";
import "./Home.css";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="wrapperCont">
        {/* MESSAGE DASHBOARD  */}

        <span className="log" onClick={handleLogOut}>
          <BiLogOut size={25} color="#6aadd7" className="icon" />
        </span>

        <Dashboard />

        {/* PROFILE CARD */}

        <Profile />
      </div>
    </div>
  );
};

export default Home;
