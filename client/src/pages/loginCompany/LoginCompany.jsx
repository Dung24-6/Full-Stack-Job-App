import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginCompany.scss";
import { useDispatch } from "react-redux";
import { loginCompany } from "../../redux/apiCalls";
import { useSelector } from "react-redux";

const LoginCompany = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    loginCompany(dispatch, { email, password });
  };
  const company = useSelector((state) => state.company.currentCompany);
  useEffect(() => {
    if (company) {
      navigate("/");
    }
  }, [company]);

  return (
    <div className="loginCompany">
      <form className="container">
        <h2>Welcome Company</h2>
        <label htmlFor="email">
          <span>Email Company</span>
          <abbr>*</abbr>
        </label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          <span>Password</span>
          <abbr>*</abbr>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleClick}>Sign in with Email Company</button>
        <footer>
          <div>
            Do not have an account?
            <Link to="/register">Contact us!</Link>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default LoginCompany;
