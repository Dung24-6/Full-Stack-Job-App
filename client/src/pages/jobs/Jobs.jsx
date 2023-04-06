import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobCard/jobCard";
import JobSummary from "../../components/jobSummary/JobSummary";
import ListJob from "../../components/listJob/listJob";
import axios from "axios";
import "./Jobs.scss";
import { useLocation } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");

  const location = useLocation();
  const prompt = location.search;
  const [jobSelect, setJobSelect] = useState(0);

  const handleJobClick = (id) => {
    setJobSelect(id);
  };
  
  useEffect(() => {
    const getJobList = async () => {
      try {
        if (prompt) {
          
          const response = await axios.get(
            `http://localhost:8000/job/searchJob${prompt}`
            );
            setJobs(response.data);
          } else{
            const response = await axios.get(
              `http://localhost:8000/job/searchAllJob`
              );
              setJobs(response.data);
          }
      } catch (error) {
        console.error(error);
      }
    };
    getJobList();
  }, []);
  useEffect(() => {
    if (jobs) {
      setJobSelect(jobs[0]?.jobId);
    }
  }, [jobs]);
  useEffect(() => {
    let companyId;
    const getCompany = async () => {
      try {
        // const res = await publicRequest.get(`company/${companyId}`);
        const res = await axios.get(
          `http://localhost:8000/company/${companyId}`
        );

        setCompany(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (jobSelect) {
      companyId = jobs.find((job) => job.jobId == jobSelect).companyId;
      getCompany();
    }
  }, [jobSelect]);

  return (
    <div className="jobs">
      <div className="container">
        <div className="job">
          <ListJob>
            {jobs.map((job) => (
              <div key={job.jobId} onClick={() => handleJobClick(job.jobId)}>
                <JobCard job={job} selected={job.jobId === jobSelect} />
              </div>
            ))}
          </ListJob>
          <JobSummary
            job={jobs.find((job) => job.jobId == jobSelect)}
            company={company}
          />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
