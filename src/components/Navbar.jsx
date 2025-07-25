import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseData from '../data/CourseData';
import logo from "../assets/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".navbar img", {
      x: 200,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".navbar",
        start: "top 10%",
        end: "bottom top",
        scrub: true,
      }
    });
    tl.to(".auth-container", {
      x: -230,
      duration: 1,
      scrollTrigger: {
        trigger: ".navbar",
        start: "top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = courseData.filter(course =>
        course.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearch('');
    setSuggestions([]);
    navigate('/Courses'); // Redirect to CoursesPage
    // Optionally, scroll or filter can be handled with query param
  };

  return (
    <div className="navbar">
      <img src={logo} alt="Website Logo" className="logo" />

      <nav className={`navigation ${scrolled ? "scrolled" : ""}`}>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/Courses" className="nav-link">Courses</NavLink>
        <NavLink to="/CourseDetails" className="nav-link">Course Details</NavLink>
        <NavLink to="/About" className="nav-link">About</NavLink>

        <div className="search-container">
          <i className="ri-search-line search-icon"></i>
          <input
            type="text"
            placeholder="Search for Courses"
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map(course => (
                <li
                  key={course.id}
                  onClick={() => handleSuggestionClick(course.title)}
                >
                  {course.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      <div className="auth-container">
        <i className="ri-sun-line theme-toggle"></i>
        {currentUser ? (
          <div className="user-info">
            <NavLink to="/profile" className="username-link">
              👤 {currentUser.username || currentUser.email.split('@')[0]}
            </NavLink>
          </div>
        ) : (
          <>
            <NavLink to="/login" className="auth-link">Log in</NavLink>
            <NavLink to="/signup" className="auth-link signup-btn">Sign up</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
