import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./JobCard.scss";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { publicRequest } from '../../requestMethods';



const JobCard = ({ job, selected, setJobs }) => {
  const [company, setCompany] = useState({});
  const currentCompany = useSelector((state) => {
    if (state.company.currentCompany) {
      return state.company.currentCompany.company;
    }
  });

  const formattedDate = moment(job.created_at).fromNow();


  const handleDelete = async () => {
    try {
      await publicRequest.delete(`job/${job.jobId}`);
      setJobs(prev => prev.filter(obj => obj.jobId !== job.jobId))
    } catch (error) {
      console.error(error);
    }
  }


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
        <div className="salary">
          <FontAwesomeIcon icon={faDollar} />
          {job?.salary}
        </div>
        <div>Flexible time</div>
      </div>
      <div className="more">
        {currentCompany?.companyId === company.companyId && <button className="primary" onClick={handleDelete}>Xóa Job</button>}
        {!currentCompany && <div className='hot'>Hot</div>}
        {currentCompany?.companyId === company.companyId && <button className='outline' ><Link to={`/modifyJob/${job.jobId}`}>Modify</Link></button>}
        <div>{job.location}</div>
        <div>{formattedDate === 'a few seconds ago' ? '1 hour ago' : formattedDate}</div>
      </div>
    </div>
  );
};

export default JobCard;
