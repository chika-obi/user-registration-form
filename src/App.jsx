import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Step1Personal from "./components/Step1Personal/Step1Personal";
import Step2Address from "./components/Step2Address/Step2Address";
import Step3Employment from "./components/Step3Employment/Step3Employment";
import Step4Review from "./components/Step4Review/Step4Review";
import FormNavigation from "./components/FormNavigation/FormNavigation";
import "./App.css";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Full form data for Steps 1-3
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    // Step 2
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    // Step 3
    jobTitle: "",
    company: "",
    experience: "",
    salary: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});

  // Navigation functions
  const nextStep = () => setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div style={{ width: "80%", margin: "50px auto", textAlign: "center" }}>
      <h1>Multi-Step Registration</h1>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Step Components */}
      {currentStep === 1 && (
        <Step1Personal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}

      {currentStep === 2 && (
        <Step2Address
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}

      {currentStep === 3 && (
        <Step3Employment
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}

      {currentStep === 4 && (
        <Step4Review
          formData={formData}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          errors={errors}
        />
      )}

      <p style={{ marginTop: "20px" }}>
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}

export default App;
