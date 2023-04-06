import {
  faCalendar,
  faGear,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./AboutCompany.scss";

const AboutCompany = ({company}) => {
  return (
    <div className="aboutCompany">
      <Link to={`/company/${company?company.companyId:2}`}>
        <div className="logo">
          <img
            className="logo-img"
            src={company?company.logo_url:''}
            alt="logo"
          />
        </div>
      </Link>
      <div className="name">{company?company.name:''}</div>
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
      <Link to={`/company/${company?company.companyId:2}`}>
        <button className="outline">About us</button>
      </Link>
    </div>
  );
};

export default AboutCompany;
