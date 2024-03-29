import React, { useEffect, useState } from "react";
import AboutCompany from "../../components/aboutCompany/aboutCompany";
import JobSummary from "../../components/jobSummary/JobSummary";
import "./Job.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Job = () => {
  const location = useLocation();
  const jobId = location.pathname.split("/")[2];
  const [company, setCompany] = useState({});
  const [job, setJob] = useState({});

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/job/searchJobById/${jobId}`
        );
        setJob(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (jobId)  {
      
      getJob();
    }
  }, [jobId]);
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
    if (job) {
      getCompany();
    }
  }, [job]);
  return (
    <div className="job">
      <div className="container">
        <JobSummary job={job} company={company} />
        <AboutCompany company={company} />
      </div>
    </div>
  );
};

export default Job;
