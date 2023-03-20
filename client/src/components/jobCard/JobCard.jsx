import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.scss";

const JobCard = () => {
  return (
    <div className="jobCard">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png"
          alt="logo"
        />
      </div>
      <div className="about">
        <Link to="/job">
          <h2>Frontend Dev</h2>
        </Link>
        <div className="sallary">
          <FontAwesomeIcon icon={faDollar} />
          2000
        </div>
        <div>Flexible time</div>
        <div>Flexible time</div>
        <div>Flexible time</div>
        <div>Flexible time</div>
      </div>
      <div className="more">
        <div className="hot">Hot</div>
        <div>Ha Noi</div>
        <div>1 ngày trước</div>
      </div>
    </div>
  );
};

export default JobCard;
