import {
  faCalendar,
  faGear,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./AboutCompany.scss";

const AboutCompany = () => {
  return (
    <div className="aboutCompany">
      <Link to="/company/:id">
        <div className="logo">
          <img
            className="logo-img"
            src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png"
            alt="logo"
          />
        </div>
      </Link>
      <div className="name">MB Bank</div>
      <div className="wrap-info">
        <div className="info">
          <FontAwesomeIcon icon={faGear} />
          Sản phẩm
        </div>
        <div className="info">
          <FontAwesomeIcon icon={faUserGroup} />
          151-300
        </div>
        <div className="info">
          <FontAwesomeIcon icon={faCalendar} />
          Thứ 2 - Thứ 6{" "}
        </div>
        <div className="info">
          <img
            className="flag"
            alt=""
            src="https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
          />
          Vietnam
        </div>
      </div>
      <Link to="/company/:id">
        <button className="outline">About us</button>
      </Link>
    </div>
  );
};

export default AboutCompany;
