import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseData from '../data/CourseData';
import './CourseDetails.css'; // Optional: Add your styles here

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // When no ID is provided (i.e., /CourseDetails directly)
  if (!id) {
    return (
      <div className="course-details-wrapper">
        <h1>Welcome to Course Details</h1>
        <p>You haven’t selected any course yet.</p>
        <button className="back-btn" onClick={() => navigate("/courses")}>
          Go to Courses
        </button>
      </div>
    );
  }

  // Parse and find the course
  const course = courseData.find(c => c.id === parseInt(id));

  // If course not found with ID
  if (!course) {
    return (

      <div className="mt-5">
         <div className="course-details-wrapper">
        <h1>Oops! Course not found.</h1>
        <p>The course you're looking for doesn't exist.</p>
        <button className="back-btn" onClick={() => navigate("/courses")}>
          Browse Courses
        </button>
      </div>
      </div>
     
    );
  }

  // Render course details
  return (
    <div className="course-details-wrapper">
      <img src={course.image} alt={course.title} />
      <h1>{course.title}</h1>
      <p><strong>Level:</strong> {course.level}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Price:</strong> {course.price}</p>
      <p style={{ marginTop: "1rem" }}>{course.fullDesc || course.desc}</p>

      <button className="back-btn" onClick={() => navigate("/courses")}>
        ← Back to Courses
      </button>
    </div>
  );
};

export default CourseDetails;
