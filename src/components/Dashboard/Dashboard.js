import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    function generateUser() {
      let users = [];
      for (let i = 0; i < 10; i++) {
        users.push({
          userId: faker.datatype.uuid(),
          avatar: faker.image.avatar(),
        });
      }
      setUsers(users);
    }
    generateUser();
  }, []);

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

  return (
    <div className="dashboard" id="dashboard" onWheel={onWheel}>
      {users.map((user) => (
        <Link to={`/chat/${user.userId}`} className="profile" key={user.userId}>
          <img src={user.avatar} alt="avatar" />
          <span className="dot"></span>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
