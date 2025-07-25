import React, { useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import bgwall from "../assets/bgwall.png";
import girl from "../assets/girl.png";
import coins from "../assets/coins.png";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import courseData from '../data/CourseData';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const monthlyRef = useRef(null);
  const oneTimeRef = useRef(null);
  const [activeTab, setActiveTab] = useState("month");
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [oneTimeAmount, setOneTimeAmount] = useState(0);
  const [returns, setReturns] = useState({ monthly: 0, oneTime: 0 });

  useGSAP(() => {
    const main = document.querySelector(".img-container");
    main.addEventListener("mousemove", (e) => {
      const MoveX = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".img-container .text", { x: `${MoveX * 0.3}%` });
      gsap.to(".img-container .bgwall", { x: `${MoveX * 0.3}%` });
      gsap.to(".img-container .coin", { x: `${MoveX * 0.3}%` });
      gsap.to(".img-container svg", { x: `${-MoveX * 0.1}%` });
    });
  }, []);

  useGSAP(() => {
    gsap.from(".about-sec h2", {
      y: 60,
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: ".about-sec",
        start: "top 80%",
        end: "top 37%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".about-sec p", {
      y: 60,
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: ".about-sec",
        start: "top 73%",
        end: "top 37%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  useGSAP(() => {
    gsap.from(".head .ca", {
      x: 350,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".head .ca",
        start: "top 85%",
        end: "top 37%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".head .yt", {
      x: -350,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".head .yt",
        start: "top 85%",
        end: "top 37%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".head .educator", {
      x: 350,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".head .educator",
        start: "top 85%",
        end: "top 37%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  // ✅ SCROLL ANIMATION for horizontal courses
  useGSAP(() => {
    gsap.registerPlugin(Draggable);
    const cards = document.querySelector(".cards");
    if (!cards) return;

    const totalWidth = cards.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(cards, {
      x: `-${totalWidth - viewportWidth}`,
      ease: "none",
      scrollTrigger: {
        trigger: ".testimonial",
        start: "top top",
        end: `+=${totalWidth - viewportWidth}`,
        scrub: 1,
        pin: true,
      },
    });
  }, []);

  const calculateReturns = (amount, type) => {
    const rate = 10;
    const time = 1;

    if (type === "monthly") {
      const r = rate / 12 / 100;
      const n = time * 12;
      const finalValue = amount * ((Math.pow(1 + r, n) - 1) * (1 + r) / r);
      return Math.round(finalValue);
    } else {
      return Math.round(amount * Math.pow(1 + rate / 100, time));
    }
  };

  useGSAP(() => {
    const setupSlider = (selector, valueRef, type, maxValue = 50000) => {
      requestAnimationFrame(() => {
        const container = document.querySelector(selector);
        if (!container) return;
        const line = container.querySelector(".line");
        const fill = container.querySelector(".fill");
        const circle = container.querySelector(".circle");
        const returnsDisplay = container.querySelector(".returns p");

        if (!line || !fill || !circle || !returnsDisplay) return;

        const maxX = line.getBoundingClientRect().width - circle.getBoundingClientRect().width;
        const currentValue = type === "monthly" ? monthlyAmount : oneTimeAmount;
        const initialX = (currentValue / maxValue) * maxX;

        gsap.set(circle, { x: initialX });
        gsap.set(fill, { width: `${(currentValue / maxValue) * 100}%` });

        Draggable.create(circle, {
          type: "x",
          bounds: { minX: 0, maxX },
          inertia: true,
          onDrag: function () {
            const progress = this.x / maxX;
            const value = Math.round(progress * maxValue / 500) * 500;
            const display = Math.min(Math.max(value, 500), maxValue);
            const returnValue = calculateReturns(display, type);

            if (valueRef.current) {
              valueRef.current.innerHTML = `₹${display.toLocaleString()} <span>${type === "monthly" ? "per month" : "one time"}</span>`;
            }

            returnsDisplay.textContent = `1 year return: ₹${returnValue.toLocaleString()}`;

            if (type === "monthly") {
              setMonthlyAmount(display);
              setReturns(prev => ({ ...prev, monthly: returnValue }));
            } else {
              setOneTimeAmount(display);
              setReturns(prev => ({ ...prev, oneTime: returnValue }));
            }

            gsap.to(fill, {
              width: `${progress * 100}%`,
              duration: 0.1,
              overwrite: true
            });
          }
        });
      });
    };

    if (activeTab === "month") {
      setupSlider(".month.active", monthlyRef, "monthly");
    } else {
      setupSlider(".one-time.active", oneTimeRef, "oneTime");
    }
  }, [activeTab]);

  return (
    <>
      <section className="parent">
        <div className='img-container'>
          <img className="bgwall" src={bgwall} alt="" />
          <h2 className='text'>One Course Closer to Wealth</h2>
          <img className="coin" src={coins} alt="" />
          <img className='girl' src={girl} alt="" />
        </div>

        <div className="about-sec">
          <div className="text2">
            <h2>Why LearnFi?</h2>
            <p>Not just courses — a smarter way to learn finance. At LearnFi, we simplify complex money concepts into real-life, actionable lessons. Whether you're a beginner or brushing up your skills, our content makes finance easy, fun, and practical.</p>
            <p>🧠 Simple Concepts</p>
            <p>📈 Real Examples</p>
            <p>📚 Practical Learning</p>
          </div>
          <div className="timeline">
            <div className="head">
              <h1>Timeline</h1>
              <div className="ca"><div className="box1">1</div><h1>CA</h1></div>
              <div className="yt"><h1>YouTube</h1><div className="box1">2</div></div>
              <div className="educator"><h1>Educator</h1><div className="box1">3</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="testimonial">
        <h1>🔥 Featured Courses</h1>
        <div className="cards">
          {courseData.map((course) => (
            <div className="square" key={course.id}>
              <div className="img">
                <img src={course.image} alt={course.title} />
              </div>
              <p>{course.title}</p>
              <div className="buy">
                <p>{course.price}</p>
                <button onClick={() => navigate(`/course/${course.id}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        <div className="calculator">
          <h1>Sip Calculator</h1>
          <div className="sip">
            <div className="heading">
              <div
                className={`month ${activeTab === "month" ? "active" : ""}`}
                onClick={() => setActiveTab("month")}
              >
                <p>Monthly SIP</p>
                <h3 ref={monthlyRef}>₹0 <span>per month</span></h3>
                <div className="line">
                  <div className="fill"></div>
                  <div className="circle"></div>
                </div>
                {activeTab === "month" && (
                  <div className="returns">
                    <p>1 year return: ₹{returns.monthly.toLocaleString()}</p>
                  </div>
                )}
              </div>

              <div
                className={`one-time ${activeTab === "one-time" ? "active" : ""}`}
                onClick={() => setActiveTab("one-time")}
              >
                <p>One Time</p>
                <h3 ref={oneTimeRef}>₹0 <span>one time</span></h3>
                <div className="line">
                  <div className="fill"></div>
                  <div className="circle"></div>
                </div>
                {activeTab === "one-time" && (
                  <div className="returns">
                    <p>1 year return: ₹{returns.oneTime.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

   
 
    <footer className="footer">
      {/* Brand Section */}
      <div className="footer-brand">
        <h1>LearnFI</h1>
        <p>One Course Closer to Wealth</p>
      </div>

      {/* Navigation Section */}
      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/courses">Courses</NavLink></li>
          <li><NavLink to="/course/1">Course Details</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="footer-social">
        <h3>Connect With Us</h3>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noreferrer"><i className="ri-instagram-line" /> Instagram</a>
          <a href="#" target="_blank" rel="noreferrer"><i className="ri-facebook-box-fill" /> Facebook</a>
          <a href="#" target="_blank" rel="noreferrer"><i className="ri-twitter-x-line" /> Twitter (X)</a>
          <a href="#" target="_blank" rel="noreferrer"><i className="ri-youtube-fill" /> YouTube</a>
        </div>
      </div>

      {/* Contact Info */}
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p>📞 Phone: 0111-293-4234</p>
        <p>📧 Email: support@learnfi.in</p>
        <p>🏢 Location: Mumbai, India</p>
      </div>


      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LearnFI. All rights reserved.</p>
      </div>
    </footer>





    </>
  );
};

export default Home;
