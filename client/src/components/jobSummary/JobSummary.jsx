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
import { useSelector } from "react-redux";

const JobSummary = ({ job, company }) => {
  const currentCompany = useSelector((state) => {
    if (state.company.currentCompany) {
      return state.company.currentCompany.company;
    }
  });
  const formattedDate = moment(job?.created_at).fromNow();
  const [heart, setHeart] = useState(false);
  let linesRequirement = job?.requirement.split("\n");
  let linesDescription = job?.description.split("\n");

  const regex = /^[a-zA-Z]/;
  return (
    <div className="jobSummary">
      <div className="header">
        <h1>{job?.title}</h1>
        <div className="name">{company?.name}</div>
        <div className="apply">
          {!currentCompany ? (
            <button>
              <Link to={`/apply/${job?.jobId}`}>Ứng tuyển</Link>
            </button>
          ) : (
            <button className="disable">Ứng tuyển</button>
          )}
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
      {linesDescription?.map((line, index) =>
        regex.test(line[0]) ? (
          <p className="bold" key={index}>
            {line}
          </p>
        ) : (
          <p key={index}>
            {line.startsWith(".")
              ? line
              : line.charAt(0).toUpperCase() + line.slice(1).replace(/^\./, "")}
          </p>
        )
      )}

      <h2>Yêu Cầu Công Việc</h2>
      {linesRequirement?.map((line, index) =>
        regex.test(line[0]) ? (
          <p className="bold" key={index}>
            {line}
          </p>
        ) : (
          <p key={index}>
            {line.startsWith(".")
              ? line
              : line.charAt(0).toUpperCase() + line.slice(1).replace(/^\./, "")}
          </p>
        )
      )}
    </div>
  );
};

export default JobSummary;
