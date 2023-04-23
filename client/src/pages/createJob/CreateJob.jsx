import React, { useEffect, useState } from "react";
import "./CreateJob.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

const CreateJob = () => {
  const [job, setJob] = useState();
  const [title, setTitle] = useState("");

  const [salary, setSalary] = useState("");
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const company = useSelector((state) => {
    if (state.company.currentCompany) {
      return state.company.currentCompany.company;
    }
  });
  const location = useLocation();
  const jobId = location.pathname.split("/")[2];
  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await publicRequest.get(`job/searchJobById/${jobId}`);
        setJob(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (jobId) {
      getJob();
    }
  }, [jobId]);
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setSalary(job.salary);
      setRequirement(job.requirement);
      setDescription(job.description);
    }
  }, [job]);

  const handleSubmit = async () => {
    const newJob = {
      title,
      salary,
      requirement,
      description,
    };
    try {
      if (!job) {
        const res = await axios.post(
          `http://localhost:8000/job/createJob`,
          newJob,
          {
            withCredentials: true,
          }
        );

        window.location.href = `/job/${res.data.jobId}`;
      } else {
        const res = await axios.put(
          `http://localhost:8000/job/updateJob/${jobId}`,
          newJob,
          {
            withCredentials: true,
          }
        );

        window.location.href = `/job/${res.data.jobId}`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="createJob">
      <div className="container">
        <header>
          <div className="about">
            <h1>{!job?'Create New Job':'Modify Job'}</h1>
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
              {company.address}
            </span>
            <span>
              <FontAwesomeIcon icon={faPhone} />
              {company.phone_number}
            </span>
          </div>
          <img src={company.logo_url} alt="" />
        </header>
        <h3>Title</h3>
        <input
          className="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>
          Salary
          <FontAwesomeIcon icon={faDollar} />
        </h3>
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <h3>Requirement</h3>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Requirement"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
        ></textarea>
        <h3>Description</h3>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="primany" onClick={handleSubmit}>
          {job?'Modify Job':'Create Job'}
        </button>
      </div>
    </div>
  );
};

export default CreateJob;
