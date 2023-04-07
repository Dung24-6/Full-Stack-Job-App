import React, { useState } from "react";
import "./CreateJob.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const CreateJob = () => {
  const company = useSelector((state) => {
    if (state.company.currentCompany) {
      return state.company.currentCompany.company;
    }
  });

  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState("");
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");



  const handleSubmit = async()=> {
    const newJob ={
      title,salary,requirement,description
    }
    try {
       const res = await axios.post(`http://localhost:8000/job/createJob`,newJob,{
        withCredentials: true,
      })
      console.log(res.data);
      window.location.href = `/job/${res.data.jobId}`;

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="createJob">
      <div className="container">
        <header>
          <div className="about">
            <h1>Create New Job</h1>
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
        <input className="title" type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
        <h3>
          Salary
          <FontAwesomeIcon icon={faDollar} />
        </h3>
        <input type="text" placeholder="Salary" onChange={(e)=>setSalary(e.target.value)}/>

        <h3>Requirement</h3>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Requirement"
          onChange={(e)=>setRequirement(e.target.value)}
        ></textarea>
        <h3>Description</h3>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Description"
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>
        <button className="primany" onClick={handleSubmit}>Create Job</button>
      </div>
    </div>
  );
};

export default CreateJob;
