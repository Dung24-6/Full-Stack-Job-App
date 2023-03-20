import React from "react";
import CompanyCard from "../companyCard/CompanyCard";
import "./TopCompany.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const TopCompany = () => {
  const [topCompanies, setTopCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/company/getTopCompanies")
      .then((response) => setTopCompanies(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="topCompany">
      <div className="container">
        <h1>Top Companies</h1>
        <div className="listCompany">
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
        </div>
        <ul>
          {topCompanies.map((company) => (
            <li key={company.companyId}>
              <img src={company.logo_url} alt={company.name} />
              <div>
                <h3>{company.name}</h3>
                <p>{company.job_count} job postings</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopCompany;
