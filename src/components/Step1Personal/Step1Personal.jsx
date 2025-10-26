import React from "react";
import "./Step1Personal.css";

function Step1Personal({ formData, setFormData, errors, setErrors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    switch (name) {
      case "fullName":
        setErrors({ ...errors, fullName: value.trim() ? "" : "Full name is required" });
        break;
      case "email":
        setErrors({
          ...errors,
          email: /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address",
        });
        break;
      case "phone":
        setErrors({
          ...errors,
          phone: /^\d{11}$/.test(value) ? "" : "Phone must be 11 digits",
        });
        break;
      case "dob":
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        setErrors({ ...errors, dob: age >= 18 ? "" : "You must be at least 18" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="step1-container">
      <label className="step1-label">Full Name</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        className="step1-input"
      />
      {errors.fullName && <p className="step1-error">{errors.fullName}</p>}

      <label className="step1-label">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="step1-input"
      />
      {errors.email && <p className="step1-error">{errors.email}</p>}

      <label className="step1-label">Phone</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="step1-input"
      />
      {errors.phone && <p className="step1-error">{errors.phone}</p>}

      <label className="step1-label">Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="step1-input"
      />
      {errors.dob && <p className="step1-error">{errors.dob}</p>}
    </div>
  );
}

export default Step1Personal;
