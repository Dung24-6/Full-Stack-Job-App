import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobCard/jobCard";
import JobSummary from "../../components/jobSummary/JobSummary";
import ListJob from "../../components/listJob/listJob";
import axios from "axios";
import "./Jobs.scss";
import { useLocation } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const location = useLocation();
  const prompt = location.search;
  // useEffect(() => {
  //   const getJobs = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8000/job/searchJob?prompt=H`);
  //       setJobs(res.data)
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getJobs();

  // }, []);
  useEffect(() => {
    const getJobList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/job/searchJob${prompt}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getJobList();

  }, []);

  return (
    <div className="jobs">
      <div className="container">
        <div className="job">
          <ListJob>
            {jobs.map((job) => (
              <JobCard key={job.jobId} job={job} />
            ))}
            
          </ListJob>
          <JobSummary />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
