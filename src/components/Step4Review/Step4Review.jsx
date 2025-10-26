import React, { useState } from "react";
import "./Step4Review.css";

function Step4Review({ formData, currentStep, setCurrentStep }) {
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!agree) return;
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 3000);
  };

  if (submitted) {
    return <h2>Registration submitted successfully! ✅</h2>;
  }

  return (
    <div className="step4-container">
      <h2>Review Your Information</h2>

      <div className="review-section">
        <h3>Personal Info</h3>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Date of Birth:</strong> {formData.dob}</p>
      </div>

      <div className="review-section">
        <h3>Address Info</h3>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>State:</strong> {formData.state}</p>
        <p><strong>Postal Code:</strong> {formData.postalCode}</p>
        <p><strong>Country:</strong> {formData.country}</p>
      </div>

      <div className="review-section">
        <h3>Employment Info</h3>
        <p><strong>Job Title:</strong> {formData.jobTitle}</p>
        <p><strong>Company:</strong> {formData.company}</p>
        <p><strong>Experience:</strong> {formData.experience} years</p>
        <p><strong>Salary:</strong> {formData.salary}</p>
        <p><strong>Skills:</strong> {formData.skills}</p>
      </div>

      <div className="terms-container">
        <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />{" "}
          I agree to the terms and conditions
        </label>
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!agree || submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

export default Step4Review;
