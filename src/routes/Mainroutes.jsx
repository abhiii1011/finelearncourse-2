import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Course from '../pages/Course';
import CourseDetails from '../pages/CourseDetails';
import Login from '../pages/Login';
import Signup from '../pages/Singup'; // ✅ correct import
import Navbar from '../components/Navbar';
import Profile from '../pages/Profile'; // ✅ correct import
const Mainroutes = () => {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const hideNavbarRoutes = ['/login', '/signup'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<Course />} />
        <Route path='//course/:id' element={<CourseDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Mainroutes;
