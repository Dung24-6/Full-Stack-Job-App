import React from 'react'
import AboutCompany from '../../components/aboutCompany/aboutCompany';
import JobSummary from '../../components/jobSummary/JobSummary';
import "./Job.scss";


const Job = () => {
  return (
    <div className='job'>
      <div className='container'>
        <JobSummary/>
        <AboutCompany/>
      </div>
    </div>
  )
}

export default Job