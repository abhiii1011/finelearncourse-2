// src/pages/Course.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CoursesPage.css";

import thubnail from "../data/thubnail.png"; // adjust the path if needed

const courseData = [
  {
    id: 1,
    title: "Master Budgeting in 7 Days",
    level: "Beginner",
    duration: "2h 30m",
    price: "₹299",
    desc: "Learn to save, plan, and spend smarter.",
    image: thubnail,
    tag: "bestseller",
  },
  {
    id: 2,
    title: "Investing Basics: Stocks & SIPs",
    level: "Intermediate",
    duration: "3h",
    price: "FREE",
    desc: "Understand how stock market & mutual funds work.",
    image: thubnail,
    tag: "free",
  },
  {
    id: 3,
    title: "Tax Planning Made Easy",
    level: "Advanced",
    duration: "1.5h",
    price: "₹249",
    desc: "Save money legally through smart tax strategies.",
    image: thubnail,
    tag: "popular",
  },
];



const CoursesPage = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", method: "Card" });
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const userKey = `user_enrolledCourses_${currentUser.email}`;
      const stored = JSON.parse(localStorage.getItem(userKey)) || [];
      setEnrolledCourses(stored);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const userKey = `user_enrolledCourses_${currentUser.email}`;
      localStorage.setItem(userKey, JSON.stringify(enrolledCourses));
    }
  }, [enrolledCourses, currentUser]);

  const filteredCourses =
    selectedTag === "all"
      ? courseData
      : courseData.filter((course) => course.tag === selectedTag);

  const handleEnrollClick = (course) => {
    if (!currentUser) {
      setLoginPrompt(true);
    } else {
      const already = enrolledCourses.find((c) => c.id === course.id);
      if (already) {
        alert("You're already enrolled in this course.");
        return;
      }
      setEnrolledCourse(course);
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    setEnrolledCourses((prev) => [...prev, enrolledCourse]);
    alert(`Enrolled in ${enrolledCourse.title} successfully!`);
    closeModal();
  };

  const closeModal = () => {
    setEnrolledCourse(null);
    setForm({ name: "", email: "", method: "Card" });
  };

  const closeLoginPrompt = () => {
    setLoginPrompt(false);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="courses-page">
      <h1 className="courses-title">📚 Our Courses</h1>
      <p className="courses-subtitle">
        Learn smarter, not harder — pick a course and start today.
      </p>

      <div className="filter-buttons">
        {["all", "bestseller", "free", "popular"].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`filter-button ${selectedTag === tag ? "active" : ""}`}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="courses-grid" key={selectedTag}>
        {filteredCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <img
              src={course.image}
              alt={course.title}
              className="course-thumbnail"
            />
            <h2 className="course-title">{course.title}</h2>
            <p className="course-desc">{course.desc}</p>
            <div className="course-info">
              <span>👤 {course.level}</span>
              <span>⏱ {course.duration}</span>
            </div>
            <div className="course-footer">
              <span className="course-price">{course.price}</span>
              <button
                className="enroll-button"
                onClick={() => handleEnrollClick(course)}
              >
                {enrolledCourses.find((c) => c.id === course.id)
                  ? "✔️ Enrolled"
                  : "Enroll Now"}
              </button>
            </div>
            <div className="course-actions">
              <Link to={`/course/${course.id}`} className="details-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Enroll Modal */}
      {enrolledCourse && (
        <div className="enroll-modal-overlay">
          <div className="enroll-modal-box">
            <h2>Enroll in: {enrolledCourse.title}</h2>
            <form onSubmit={handleEnrollSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleInput}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleInput}
                required
              />
              <select
                name="method"
                value={form.method}
                onChange={handleInput}
              >
                <option>Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
              </select>
              <div className="modal-btns">
                <button type="submit" className="pay-btn">
                  Confirm & Pay
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {loginPrompt && (
        <div className="enroll-modal-overlay">
          <div className="enroll-modal-box">
            <h2>Please log in to enroll</h2>
            <p>You need an account to access this course.</p>
            <div className="modal-btns">
              <button className="pay-btn" onClick={goToLogin}>
                Go to Login
              </button>
              <button className="cancel-btn" onClick={closeLoginPrompt}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
