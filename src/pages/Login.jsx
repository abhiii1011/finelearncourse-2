import React, { useState } from 'react';
import './Singup.css';
import logo from "../assets/logo.png";
import loginBg from "../assets/loginBg.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const { success, message } = login(email, password);
    setMsg(message);
    if (success) {
      setTimeout(() => {
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
            <p>Login to your account</p>
          </div>
          <div className="singup-form">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="message">{msg}</p>
            </form>
          </div>
        </div>
        <p className='login-page'>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
