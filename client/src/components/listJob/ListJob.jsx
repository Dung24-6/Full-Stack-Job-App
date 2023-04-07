import React from "react";
import "./ListJob.scss";

const ListJob = ({ children }) => {
  return (
    <nav className="listJob">
      <h1>Công việc</h1>

      {children}
    </nav>
  );
};

export default ListJob;
