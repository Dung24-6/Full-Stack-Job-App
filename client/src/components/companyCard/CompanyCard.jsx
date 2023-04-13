import React from 'react'
import { Link } from 'react-router-dom';
import "./CompanyCard.scss";


const CompanyCard = ({ company }) => {
  return (
    <div className='companyCard'>

      <Link to={`/company/${company.companyId}`}>
        <div className='logo' >
          <img className='logo-img' src={company.logo_url} alt='logo' /></div>
        <div className='name'>{company.name}</div>
        <footer className='foot'>{company.address}</footer>
      </Link>
    </div>
  )
}

export default CompanyCard