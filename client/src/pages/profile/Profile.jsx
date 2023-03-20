import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <div className="container">
        <div className="userCard">
          <img
            src="https://vn-test-11.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
            alt="avt"
          />
          <div className="info">
            <h1>Roo Jiren</h1>
            <span>
              <FontAwesomeIcon icon={faMailReply} />
              roojiren@gmail.com
            </span>
          </div>
        </div>
        <div className="skills">
          <h2>Skills</h2>
          <span>html</span>
          <span>css</span>
          <span>js</span>
          <span>node</span>
          <span>react</span>
          <span>php</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
