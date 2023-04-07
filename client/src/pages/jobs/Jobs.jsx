import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobCard/jobCard";
import JobSummary from "../../components/jobSummary/JobSummary";
import ListJob from "../../components/listJob/ListJob";
import axios from "axios";
import "./Jobs.scss";
import { useLocation } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsFiltered, setJobsFiltered] = useState([]);

  const [company, setCompany] = useState("");

  const location = useLocation();
  const prompt = location.search;
  const [jobSelect, setJobSelect] = useState(0);
  const [filter, setFilter] = useState();

  const locationData = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"];
  const salaryData = [">500$", ">1000$", ">2000$", ">2500$"];

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
        } else {
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
    if (jobsFiltered) {
      setJobSelect(jobsFiltered[0]?.jobId);
    }
  }, [jobsFiltered]);
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

  useEffect(() => {
    filter
      ? setJobsFiltered(
          jobs.filter((job) => {
            return Object.entries(filter).every(([key, value]) => {
              return (
                (key === "salary"
                  ? job[key] > parseInt(value.substring(1, value.length - 1))
                  : job[key] === value) || filter[key] === ""
              );
            });
          })
        )
      : setJobsFiltered(jobs);
  }, [filter, jobs]);

  return (
    <div className="jobs">
      <div className="container">
        <div className="filterList">
          <Filter name="location" data={locationData} onChange={setFilter} />
          <Filter name="salary" data={salaryData} onChange={setFilter} />
          <button>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
        <div className="job">
          <ListJob>
            {jobsFiltered.map((job) => (
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
