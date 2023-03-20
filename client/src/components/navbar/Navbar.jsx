import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const currentUser = {
    id: 1,
    isCompany: true,
    username: "Roo Jiren",
  };

  return (
    <div className={active ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <img
              src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="links">
          <Link to="/jobs" className="link">
            <span>All Jobs</span>
          </Link>

          <Link to="/companies" className="link">
            <span>IT Companies</span>
          </Link>
        </div>
        <div className="right">
          {!currentUser ? (
            <>
              <Link to="/login" className="link">
                <span>Sign in</span>
              </Link>
            </>
          ) : (
            <>
              <div className="user" onClick={() => setOpen(!open)}>
                <img
                  src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd2lJTEE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d5e6535c22419e6cf6861248aec407edf8d92051/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--492f60b9aac6e8159e50e72bb289c5feb47a79d4/%5BGHTK%5D_Logo_RGB.png"
                  alt=""
                />
                <span>{currentUser?.username}</span>
                {open && (
                  <div className="options">
                    <Link to="/profile" className="link">
                      My account
                    </Link>
                    <Link to="/profile" className="link">
                      Setting
                    </Link>
                    <Link to="/login" className="link">
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
