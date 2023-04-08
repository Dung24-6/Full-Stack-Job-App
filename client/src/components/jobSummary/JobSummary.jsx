import {
  faCalendar,
  faDollar,
  faHeart,
  faLocationDot,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./JobSummary.scss";
import moment from "moment";

const JobSummary = ({ job, company }) => {
  const formattedDate = moment(job?.create_at).fromNow();
  const [heart, setHeart] = useState(false);

  return (
    <div className="jobSummary">
      <div className="header">
        <h1>{job?.title}</h1>
        <div className="name">{company?.name}</div>
        <div className="apply">
          <button>
            <Link to={`/apply/${job?.jobId}`}>Ứng tuyển</Link>
          </button>
          {heart ? (
            <FontAwesomeIcon icon={faHeart} onClick={() => setHeart(false)} />
          ) : (
            <FontAwesomeIcon
              icon={faHeartOutline}
              style={{ color: "#000" }}
              onClick={() => setHeart(true)}
            />
          )}
        </div>
      </div>
      <div className="overview">
        <div className="overview-item sallary">
          <FontAwesomeIcon icon={faDollar} />
          {job?.salary} USD
        </div>
        <div className="overview-item">
          <FontAwesomeIcon icon={faLocationDot} />
          {company?.address}
        </div>
        <div className="overview-item">
          <FontAwesomeIcon icon={faUserAlt} />
          Tại văn phòng
        </div>
        <div className="overview-item time">
          <FontAwesomeIcon icon={faCalendar} />
          {formattedDate === "a few seconds ago" ? "1 hour ago" : formattedDate}
        </div>
      </div>
      <h2>Mô Tả Công Việc</h2>
      <p>{job?.description}</p>
      <h2>Yêu Cầu Công Việc</h2>
      <p>{job?.requirement}</p>
    </div>
  );
};

export default JobSummary;
