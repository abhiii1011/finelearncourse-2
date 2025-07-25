import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';
const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) return null;

  return (
   <div className="profile">
     <div className="profile-page ">
      <h2>👤 User Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {currentUser.username || currentUser.email.split('@')[0]}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>

      <h3>🎓 Enrolled Courses</h3>
      {currentUser.enrolledCourses && currentUser.enrolledCourses.length > 0 ? (
        <ul className="enrolled-list">
          {currentUser.enrolledCourses.map((course, i) => (
            <li key={i} className="enrolled-item">
              <strong>{course.title}</strong> — {course.duration} | {course.level}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses enrolled yet.</p>
      )}

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
   </div>
  );
};

export default Profile;
