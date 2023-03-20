import React from 'react'
import { Link } from 'react-router-dom';
import "./Login.scss";


const Login = () => {
  return (
    <div className='login'>
        
        <div className='container'>
        <h2>Welcome</h2>
        <label htmlFor='email'>
            <span>Email Address</span>
            <abbr>*</abbr>
        </label>
        <input id='email' type='text' placeholder='Email'/>
        <label htmlFor='password'>
            <span>Password</span>
            <abbr>*</abbr>
        </label >
        <input id='password' type='password' placeholder='Password'/>
        
        <button>Sign in with Email</button>
        <footer>
            <div>Do not have an account?
                <Link to='/register'>Sign up now!</Link>
            </div>
            
        </footer>
        </div>

    </div>
  )
}

export default Login