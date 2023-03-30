import React from "react";
import { useState, useEffect } from "react";
import CompanyCard from "../companyCard/CompanyCard";
import "./TopCompany.scss";
import axios from "axios";

const TopCompany = () => {
  const [topCompanies, setTopCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/company")
      .then((response) => setTopCompanies(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="topCompany">
      <div className="container">
        <h1>Top Companies</h1>
        <div className="listCompany">
          {topCompanies.map(company=>
            <CompanyCard key={company.id} company={company}/>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default TopCompany;
