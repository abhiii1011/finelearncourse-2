import React, { useState } from 'react';
import './Singup.css';
import logo from "../assets/logo.png";
import loginBg from "../assets/loginBg.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Signup = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const { success, message } = signup(email, password, username);
    setMsg(message);
    if (success) {
      setTimeout(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setLoading(false);
        navigate("/");
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className='singup-page'>
      <div className="container">
        <div className="left-side">
          <img src={loginBg} alt="" />
        </div>
        <div className="right-side">
          <div className="right-head">
            <img src={logo} alt="" />
            <p>Create account</p>
          </div>
          <div className="singup-form">
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </button>
              <p className="message">{msg}</p>
          
            </form>
          </div>
        </div>
        <p className='login-page'>
          Have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
