import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./JobCard.scss";
import axios from "axios";
import moment from "moment";

const JobCard = ({ job, selected }) => {
  const [company, setCompany] = useState();
  
  const formattedDate = moment(job.create_at).fromNow();
  
  
  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/company/${job.companyId}`
        );
        setCompany(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCompany();
  }, []);

  return (
    <div className={selected ? "jobCard action" : "jobCard"}>
      <div className="logo">
        <img src={company ? company.logo_url : ""} alt="logo" />
      </div>
      <div className="about">
        <h2>
          <Link to={`/job/${job.jobId}`}>{job.title}</Link>
        </h2>
        <div className="sallary">
          <FontAwesomeIcon icon={faDollar} />
          {job?.salary}
        </div>
        <div>Flexible time</div>
      </div>
      <div className="more">
        <div className="hot">Hot</div>
        <div>{job.location}</div>
        <div>{formattedDate==='a few seconds ago'?'1 hour ago':formattedDate}</div>
      </div>
    </div>
  );
};

export default JobCard;
