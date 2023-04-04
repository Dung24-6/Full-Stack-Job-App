import React, { useState } from "react";
import axios from "axios";
import "./applyJob.scss";

const ApplyJob = ({ jobId, companyEmail, userId }) => {
  const [cv, setCv] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("cv", cv);
      formData.append("companyEmail", companyEmail);
      formData.append("jobId", jobId);
      formData.append("userId", userId);
      await axios.post("http://localhost:8000/application", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Applied successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to apply!");
    }
  };

  return (
    <div className="applyJob">
      <form onSubmit={handleSubmit}>
        <h1>Ứng tuyển công việc này</h1>
        <input type="file" onChange={(e) => setCv(e.target.files[0])} />
        <button type="submit">Gửi đơn ứng tuyển</button>
      </form>
    </div>
  );
};

export default ApplyJob;
