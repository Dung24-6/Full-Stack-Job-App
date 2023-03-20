import React from "react";
import Featured from "../../components/featured/Featured";
import TopCompany from "../../components/topCompany/TopCompany";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TopCompany />
    </div>
  );
};

export default Home;
