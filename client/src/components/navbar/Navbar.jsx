import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, logoutCompany } from "../../redux/apiCalls";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const currentUser = useSelector((state) => {
    if (state.user.currentUser) {
      return state.user.currentUser.user;
    }
  });
  const currentCompany = useSelector((state) => {
    if (state.company.currentCompany) {
      return state.company.currentCompany.company;
    }
  });
  const handleLogout = () => {
    logout(dispatch);
  };
  const handleLogoutCompany = () =>{
    logoutCompany(dispatch);

  }

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
          {(!currentUser)&&(!currentCompany) ? (
            <>
              <Link to="/loginCompany" className="link">
                <span>For company</span>
              </Link>
              <Link to="/login" className="link">
                <span>Sign in</span>
              </Link>
              <Link to="/register" className="link">
                <span>Sign up</span>
              </Link>
            </>
          ) : ( currentUser?
            <>
              <div className="user" onClick={() => setOpen(!open)}>
                <img
                  src={
                    currentUser
                      ? currentUser.avatar_url.replace(
                          "..\\client\\public",
                          "\\public"
                        )
                      : "https://vn-test-11.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                  }
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
                    <Link to="/login" className="link" onClick={handleLogout}>
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </>
            :
            <>
            <Link to="/createJob" className="link">
                <span>Create job</span>
              </Link>
              <div className="user" onClick={() => setOpen(!open)}>
                <img
                  src={
                    currentCompany
                      ? currentCompany.logo_url
                      : "https://vn-test-11.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                  }
                  alt=""
                />
                <span>{currentCompany?.name}</span>
                {open && (
                  <div className="options">
                    
                    
                    <Link to="/loginCompany" className="link" onClick={handleLogoutCompany}>
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
