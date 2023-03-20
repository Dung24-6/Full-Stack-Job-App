import React from 'react'
import { Link } from 'react-router-dom';
import "./Register.scss";


const Register = () => {
  return (
    <div className='register'>
        
        <div className='container'>
        <h2>Welcome</h2>
        <h1>Sign Up</h1>
        <label htmlFor='name'>
            <span>Name</span>
            <abbr>*</abbr>
        </label>
        <input id='name' type='text' placeholder='Name'/>

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
        
        <button >Sign up with Email</button>
        <footer>
            <div>Already have an account?
                <Link to='/login'>Sign in now!</Link>
            </div>
            
        </footer>
        </div>

    </div>
  )
}

export default Register