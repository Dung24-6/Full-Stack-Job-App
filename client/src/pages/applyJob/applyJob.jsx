import React, { useEffect, useState } from "react";
import axios from "axios";
import "./applyJob.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faFileArrowUp,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const ApplyJob = () => {
  const location = useLocation();
  const jobId = location.pathname.split("/")[2];
  const currentUser = useSelector((state) => {
    if (state.user.currentUser) {
      return state.user.currentUser.user;
    }
  });

  const [job, setJob] = useState();
  const [company, setCompany] = useState();
  const [name, setName] = useState(currentUser.username);
  const [cv, setCv] = useState();
  const [reason, setReason] = useState();

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
    getJob();
  }, []);
  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/company/${job ? job.companyId : ""}`
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
    <div className="applyJob">
      <div className="container">
        <header>
          <h1>Apply Job</h1>
          <img src={company?.logo_url} alt="" />
        </header>
        <h2>
          {job?.title} tại {company?.name}
        </h2>
        <h3>Your name</h3>
        <input
          className="title"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h3>CV</h3>
        <div className="uploadCV">
          {!cv ? (
            <label htmlFor="CV">
              <FontAwesomeIcon icon={faFileArrowUp} />
              Upload CV
            </label>
          ) : (
            <label htmlFor="CV" className="sentCV">
              <FontAwesomeIcon icon={faFileCircleCheck} />
              {cv?.name}
            </label>
          )}
          <input
            type="file"
            id="CV"
            name="CV"
            onChange={(e) => setCv(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <h3>Why you choose our job?</h3>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Why?"
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <button>Send my CV</button>
      </div>
    </div>
  );
};

export default ApplyJob;
