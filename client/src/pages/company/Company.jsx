import {
  faCalendar,
  faGear,
  faLocationDot,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Company.scss";
import ListJob from "../../components/listJob/listJob";
import JobCard from "../../components/jobCard/jobCard";
import JobSummary from "../../components/jobSummary/JobSummary";
import { useLocation } from "react-router-dom";
import { companys } from "../../data";

const Company = () => {
  const location = useLocation();
  const companyName = location.pathname.split("/")[2];
  let company;
  for (let i = 0; i < companys.length; i++) {
    if (companyName === companys[i].linkName) {
      company=companys[i];
    }
  }
  return (
    <div className="company">
      <div className="container">
        <header>
          <div className="logo">
            <img
              src={company.logo}
              alt="logo"
            />
          </div>
          <div className="about">
            <h1>{company.name}</h1>
            <div className="info">
              <FontAwesomeIcon icon={faLocationDot} /> 
              {company.location}
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
                Thứ 2 - Thứ 6{" "}
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
            <button className="primary">Viết đánh giá</button>
            <button className="outline">Theo dõi</button>
          </div>
        </header>
        <div className="job">
          <ListJob>
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </ListJob>
          <JobSummary />
        </div>
      </div>
    </div>
  );
};

export default Company;
