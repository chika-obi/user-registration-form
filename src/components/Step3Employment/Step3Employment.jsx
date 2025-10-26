import React from "react";
import "./Step3Employment.css";

function Step3Employment({ formData, setFormData, errors, setErrors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    switch (name) {
      case "jobTitle":
        setErrors({ ...errors, jobTitle: value.trim() ? "" : "Job title is required" });
        break;
      case "company":
        setErrors({ ...errors, company: value.trim() ? "" : "Company is required" });
        break;
      case "experience":
        setErrors({
          ...errors,
          experience: /^\d+$/.test(value) ? "" : "Experience must be a number",
        });
        break;
      case "salary":
        setErrors({
          ...errors,
          salary: /^\d+$/.test(value) ? "" : "Salary must be a number",
        });
        break;
      case "skills":
        setErrors({ ...errors, skills: value.trim() ? "" : "At least one skill is required" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="step3-container">
      <label className="step3-label">Job Title</label>
      <input
        type="text"
        name="jobTitle"
        value={formData.jobTitle || ""}
        onChange={handleChange}
        className="step3-input"
      />
      {errors.jobTitle && <p className="step3-error">{errors.jobTitle}</p>}

      <label className="step3-label">Company</label>
      <input
        type="text"
        name="company"
        value={formData.company || ""}
        onChange={handleChange}
        className="step3-input"
      />
      {errors.company && <p className="step3-error">{errors.company}</p>}

      <label className="step3-label">Experience (Years)</label>
      <input
        type="text"
        name="experience"
        value={formData.experience || ""}
        onChange={handleChange}
        className="step3-input"
      />
      {errors.experience && <p className="step3-error">{errors.experience}</p>}

      <label className="step3-label">Salary</label>
      <input
        type="text"
        name="salary"
        value={formData.salary || ""}
        onChange={handleChange}
        className="step3-input"
      />
      {errors.salary && <p className="step3-error">{errors.salary}</p>}

      <label className="step3-label">Skills (comma separated)</label>
      <input
        type="text"
        name="skills"
        value={formData.skills || ""}
        onChange={handleChange}
        className="step3-input"
      />
      {errors.skills && <p className="step3-error">{errors.skills}</p>}
    </div>
  );
}

export default Step3Employment;
