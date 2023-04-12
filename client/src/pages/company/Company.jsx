import {
  faCalendar,
  faGear,
  faLocationDot,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./Company.scss";
import ListJob from "../../components/listJob/ListJob";
import JobSummary from "../../components/jobSummary/JobSummary";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import JobCard from "../../components/jobCard/JobCard";

const Company = () => {
  const location = useLocation();
  const companyId = location.pathname.split("/")[2];
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const [jobSelect, setJobSelect] = useState(0);
  const [option, setOption] = useState("Jobs");
  const [reviews, setReviews] = useState([]);

  const handleJobClick = (id) => {
    setJobSelect(id);
  };

  useEffect(() => {
    const getCompany = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/company/${companyId}`
        );

        setCompany(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCompany();
  }, []);
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/job/searchJobByCompany/${companyId}`
        );
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (company) {
      getJobs();
    }
  }, [company]);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/review/reviews/${companyId}`
        );
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (company) {
      getReviews();
    }
  }, [company]);
  useEffect(() => {
    if (jobs) {
      setJobSelect(jobs[0]?.jobId);
    }
  }, [jobs]);

  return (
    <div className="company">
      <div className="container">
        <header>
          <div className="logo">
            <img src={company.logo_url} alt="logo" />
          </div>
          <div className="about">
            <h1>{company.name}</h1>
            <div className="info">
              <FontAwesomeIcon icon={faLocationDot} />
              {company.address}
            </div>
            <div className="wrap-info">
              <div className="info">
                <FontAwesomeIcon icon={faGear} />
                Sản phẩm
              </div>
              <div className="info">
                <FontAwesomeIcon icon={faUserGroup} />
                151-300
              </div>
              <div className="info">
                <FontAwesomeIcon icon={faCalendar} />
                Thứ 2 - Thứ 6
              </div>
              <div className="info">
                <img
                  className="flag"
                  alt=""
                  src="https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                />
                Vietnam
              </div>
            </div>
          </div>
          <div className="header-btn">
            <button className="primary">
              <Link to={`/review/${company.companyId}`}>Viết đánh giá</Link>
            </button>
            <button className="outline">Theo dõi</button>
          </div>
        </header>
        <div className="options">
          <span
            className={option === "Jobs" ? "option active" : "option"}
            onClick={() => setOption("Jobs")}
          >
            Tuyển dụng
          </span>
          <span
            className={option === "Reviews" ? "option active" : "option"}
            onClick={() => setOption("Reviews")}
          >
            Đánh giá
          </span>
        </div>
        {option === "Jobs" ? (
          <div className="job">
            <ListJob>
              {jobs.map((job) => (
                <div key={job.jobId} onClick={() => handleJobClick(job.jobId)}>
                  <JobCard job={job} selected={job.jobId === jobSelect} setJobs={setJobs} />
                </div>
              ))}
            </ListJob>
            <JobSummary
              job={jobs.find((job) => job.jobId == jobSelect)}
              company={company}
            />
          </div>
        ) : (
          <div className="review">
            <div className="reviewList">
              <h2 className="title">Đánh giá</h2>
              {reviews.map((review) => (
                <ReviewCard key={review.reviewId} review={review} />
              ))}
            </div>
            <div className="letWrite">
              <h2>Let your voice be heard.</h2>
              <span>Review {company.name} now</span>
              <button className="primary">
                <Link to={`/review/${company.companyId}`}>Viết đánh giá</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Company;
