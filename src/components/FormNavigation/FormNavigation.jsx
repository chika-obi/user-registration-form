import React from "react";
import "./FormNavigation.css"; // optional for button styling

function FormNavigation({ currentStep, totalSteps, nextStep, prevStep, errors }) {
  const hasErrors = Object.values(errors).some((err) => err);

  return (
    <div className="form-navigation">
      {currentStep > 1 && (
        <button className="form-button form-button-secondary" onClick={prevStep}>
          Previous
        </button>
      )}
      {currentStep < totalSteps && (
        <button
          className="form-button form-button-primary"
          onClick={nextStep}
          disabled={hasErrors}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default FormNavigation;
