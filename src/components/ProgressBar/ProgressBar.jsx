import React from "react";
import "./ProgressBar.css";

function ProgressBar({ currentStep, totalSteps }) {
  const progressPercent = (currentStep / totalSteps) * 100;

  // Create an array of step numbers [1, 2, 3, ... totalSteps]
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="progress-bar-wrapper">
      {/* Step numbers */}
      <div className="progress-steps">
        {steps.map((step) => (
          <div
            key={step}
            className={`step-number ${currentStep >= step ? "active" : ""}`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
