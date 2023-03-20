import React from "react";
import CompanyCard from "../companyCard/CompanyCard";
import "./TopCompany.scss";

const TopCompany = () => {
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
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
        </div>
      </div>
    </div>
  );
};

export default TopCompany;
