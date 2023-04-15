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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    window.location.href = `/jobs?prompt=${search}`;
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearchPopular = (name) => {
    window.location.href = `/jobs?prompt=${name}`;
  };

  return (
    <div className="featured">
      <div className="container">
        <h1>3,578 IT Jobs</h1>
        <div className="search">
          {/* <div className="location" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{location}</span>
            <FontAwesomeIcon icon={faChevronDown} />
            {open && (
              <div className="options">
                <span onClick={() => setLocation("All cities")}>
                  All cities
                </span>
                <span onClick={() => setLocation("Ha Noi")}>Ha Noi</span>
                <span onClick={() => setLocation("Ho Chi Minh")}>
                  Ho Chi Minh
                </span>
                <span onClick={() => setLocation("Da Nang")}>Da Nang</span>
              </div>
            )}
          </div> */}
          <div className="searchInput">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="popular">
          <span onClick={(e) => handleSearchPopular(e.target.innerText)}>
            Java
          </span>
          <span onClick={(e) => handleSearchPopular(e.target.innerText)}>
            ReactJS
          </span>
          <span onClick={(e) => handleSearchPopular(e.target.innerText)}>
            Express
          </span>
          <span onClick={(e) => handleSearchPopular(e.target.innerText)}>
            PHP
          </span>
        </div>
      </div>
    </div>
  );
};

export default Featured;
