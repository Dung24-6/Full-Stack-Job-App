import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./JobCard.scss";
import axios from "axios";

const JobCard = ({job,selected}) => {
  const [company,setCompany] = useState()
  useEffect(()=>{
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
  },[])

  
  return (
    <div className={selected?"jobCard action":"jobCard"} >
      <div className="logo">
        <img
          src={company?company.logo_url:''}
          alt="logo"
        />
      </div>
      <div className="about">
        <Link to={`/job/${job.jobId}`}>
          <h2>{job.title}</h2>
        </Link>
        <div className="sallary">
          <FontAwesomeIcon icon={faDollar} />
          2000
        </div>
        <div>Flexible time</div>
        
      </div>
      <div className="more">
        <div className="hot">Hot</div>
        <div>{job.location}</div>
        <div>1 ngày trước</div>
      </div>
    </div>
  );
};

export default JobCard;
