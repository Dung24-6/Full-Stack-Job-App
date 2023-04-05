import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobCard/jobCard";
import JobSummary from "../../components/jobSummary/JobSummary";
import ListJob from "../../components/listJob/listJob";
import axios from "axios";
import "./Jobs.scss";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/job/searchJob?prompt=H`);
        setJobs(res.data)
        console.log(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs()
  }, []);
  return (
    <div className="jobs">
      <div className="container">
        <div className="job">
          <ListJob>
            <JobCard />
            
          </ListJob>
          <JobSummary />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
