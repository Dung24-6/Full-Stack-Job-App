import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="login">
      <form className="container">
        <h2>Welcome</h2>
        <label htmlFor="email">
          <span>Email Address</span>
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

        <button onClick={handleClick}>Sign in with Email</button>
        <footer>
          <div>
            Do not have an account?
            <Link to="/register">Sign up now!</Link>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Login;
