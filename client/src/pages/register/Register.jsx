import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await publicRequest.post("users/register", {
        username,
        email,
        password,
      });
      res.data ? navigate("/login") : console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    register();
  };
  return (
    <div className="register">
      <form className="container">
        <h2>Welcome</h2>
        <h1>Sign Up</h1>
        <label htmlFor="name">
          <span>Name</span>
          <abbr>*</abbr>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button onClick={handleClick}>Sign up with Email</button>
        <footer>
          <div>
            Already have an account?
            <Link to="/login">Sign in now!</Link>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Register;
