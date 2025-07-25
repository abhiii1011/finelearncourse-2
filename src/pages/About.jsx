import React from "react";
import "./About.css";
import rachanaImage from "../data/thubnail.png"; 

const AboutRachana = () => {
  return (
    <div className="about-founder">
      <div className="about-wrapper">
        <h1>👩‍🏫 About CA Rachana Ranade</h1>

        <div className="about-content">
          <img src={rachanaImage} alt="CA Rachana Ranade" className="founder-photo" />

          <div className="text-section">
            <h2>Meet the Mentor</h2>
            <p>
              CA Rachana Ranade is one of India's most loved finance educators,
              with a mission to simplify stock market, personal finance, and
              investing for everyone — especially beginners.
            </p>
            <p>
              With over <strong>4 million subscribers</strong> on YouTube and
              more than a decade of teaching experience, Rachana has helped
              lakhs of learners build their financial foundation.
            </p>
            <p>
              She is a Chartered Accountant by qualification and a teacher by
              passion, known for her relatable, practical, and engaging style
              of explaining even the most complex topics.
            </p>

            <p className="highlight">
              “My goal is to make financial education so simple that even a
              school student can understand it.”
            </p>

            <h3>🎯 What Makes Her Unique?</h3>
            <ul>
              <li>✅ Explains in simple Hindi/Marathi/English</li>
              <li>✅ Real-life examples, case studies, and demos</li>
              <li>✅ Focus on application over theory</li>
              <li>✅ Beginner-friendly investing & trading courses</li>
            </ul>

            <h3>📚 Courses by Rachana Ranade</h3>
            <p>
              From Stock Market Basics, Technical Analysis, to Personal
              Finance, her self-paced courses empower you to take charge of
              your money.
            </p>
            <button className="explore-btn" onClick={() => window.location.href = "/courses"}>
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRachana;
