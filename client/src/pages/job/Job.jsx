import React, { useEffect, useState } from 'react'
import AboutCompany from '../../components/aboutCompany/aboutCompany';
import JobSummary from '../../components/jobSummary/JobSummary';
import "./Job.scss";
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const Job = () => {
  const location = useLocation();
  const jobId = location.pathname.split("/")[2];
  const [company,setCompany] = useState()
  useEffect(()=>{
    const getCompany = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/company/2`
        );
        setCompany(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCompany();
  },[])
  return (
    <div className='job'>
      <div className='container'>
        <JobSummary/>
        <AboutCompany company={company}/>
      </div>
    </div>
  )
}

export default Job