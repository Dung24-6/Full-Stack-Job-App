import React from 'react'
import JobCard from '../../components/jobCard/jobCard'
import JobSummary from '../../components/jobSummary/JobSummary'
import ListJob from '../../components/listJob/listJob'
import './Jobs.scss'

const Jobs = () => {
  return (
    <div className='jobs'><div className="container">
    
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
  </div></div>
  )
}

export default Jobs