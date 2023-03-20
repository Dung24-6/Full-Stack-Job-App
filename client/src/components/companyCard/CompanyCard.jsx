import React from 'react'
import { Link } from 'react-router-dom';
import "./CompanyCard.scss";


const CompanyCard = () => {
  return (
    <div className='companyCard'>

        <Link to='/company/:name'>
            <div className='logo' >
                <img className='logo-img' src='https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png' alt='logo'/></div>
            <div className='name'>MB Bank</div>
            <footer className='foot'>23 Việc làm - Hà nội</footer>
        </Link>
    </div>
  )
}

export default CompanyCard