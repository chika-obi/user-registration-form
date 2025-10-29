import React from "react";
import "./FormNavigation.css";

function FormNavigation({ currentStep, totalSteps, nextStep, prevStep, isStepValid }) {
  return (
    <div className="form-navigation">
      {currentStep > 1 ? (
        <button type="button" className="form-button form-button-secondary" onClick={prevStep}>
          Previous
        </button>
      ) : <div />}

      {currentStep < totalSteps ? (
        <button
          type="button"
          className="form-button form-button-primary"
          onClick={nextStep}
          disabled={!isStepValid}
          aria-disabled={!isStepValid}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}

export default FormNavigation;
