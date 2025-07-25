import React, { useState } from "react";
import "./EnrollModal.css";

const EnrollModal = ({ course, onClose, onEnroll }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    method: "Card",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnroll(); // trigger context enroll
    onClose();  // close popup
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Enroll in "{course.title}"</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <select name="method" value={form.method} onChange={handleChange}>
            <option>Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
          </select>
          <button type="submit">Confirm & Pay</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EnrollModal;
