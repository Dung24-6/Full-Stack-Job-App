import {
  faChevronDown,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Featured.scss";

const Featured = () => {
  const [location, setLocation] = useState("All cities");
  const [open,setOpen] = useState(false)
  const [search,setSearch] = useState('')
  const handleSearch = () => {
    window.location.href = `/jobs?search=${search}`;
  };


  return (
    <div className="featured">
      <div className="container">
        <h1>1400 Viec</h1>
        <div className="search">
          <div className="location" onClick={()=>setOpen(!open)}>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{location}</span>
            <FontAwesomeIcon icon={faChevronDown} />
            {open && <div className="options">
              <span onClick={()=>setLocation('All cities')}>All cities</span>
              <span onClick={()=>setLocation('Ha Noi')}>Ha Noi</span>
              <span onClick={()=>setLocation('Ho Chi Minh')}>Ho Chi Minh</span>
              <span onClick={()=>setLocation('Da Nang')}>Da Nang</span>
            </div>}
          </div>
          <div className="searchInput">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search" onChange={e=>setSearch(e.target.value)}/>
          </div>
          

          <button onClick={handleSearch}>Search</button>
          
        </div>
        <div className="popular">
          <Link to="/" className="link">
            java
          </Link>
          <Link to="/" className="link">
            node
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
