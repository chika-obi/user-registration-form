import React, { useMemo } from "react";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Step1Personal from "./components/Step1Personal/Step1Personal";
import Step2Address from "./components/Step2Address/Step2Address";
import Step3Employment from "./components/Step3Employment/Step3Employment";
import Step4Review from "./components/Step4Review/Step4Review";
import FormNavigation from "./components/FormNavigation/FormNavigation";
import CanvasBackground from "./components/CanvasBackground/CanvasBackground";
import "./App.css";

function App() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = React.useState({
    // Step1
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    // Step2
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    // Step3
    jobTitle: "",
    company: "",
    experience: "",
    salary: "",
    skills: "",
  });

  const [errors, setErrors] = React.useState({});

  // ---- lightweight pure-check validators (no error state changes) ----
  const checkStep1Valid = (data = formData) => {
    if (!data.fullName.trim()) return false;
    if (!/\S+@\S+\.\S+/.test(data.email)) return false;
    if (!/^\d{11}$/.test(data.phone)) return false;
    if (!data.dob) return false;
    const age = new Date().getFullYear() - new Date(data.dob).getFullYear();
    if (Number.isNaN(age) || age < 18) return false;
    return true;
  };

  const checkStep2Valid = (data = formData) => {
    if (!data.address.trim()) return false;
    if (!data.city.trim()) return false;
    if (!data.state.trim()) return false;
    if (!/^\d{5,6}$/.test(data.postalCode)) return false;
    return true;
  };

  const checkStep3Valid = (data = formData) => {
    if (!data.jobTitle.trim()) return false;
    if (!data.company.trim()) return false;
    if (!/^\d+$/.test(data.experience)) return false;
    if (!/^\d+$/.test(data.salary)) return false;
    if (!data.skills.trim()) return false;
    return true;
  };

  // ---- validators that set errors (run when user clicks Next / Submit) ----
  const validateStep1AndSetErrors = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!/^\d{11}$/.test(formData.phone)) newErrors.phone = "Phone must be 11 digits";
    if (!formData.dob) newErrors.dob = "Date of birth required";
    else {
      const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (Number.isNaN(age) || age < 18) newErrors.dob = "You must be at least 18";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2AndSetErrors = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!/^\d{5,6}$/.test(formData.postalCode)) newErrors.postalCode = "Postal code must be 5 or 6 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3AndSetErrors = () => {
    const newErrors = {};
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!/^\d+$/.test(formData.experience)) newErrors.experience = "Experience must be a number";
    if (!/^\d+$/.test(formData.salary)) newErrors.salary = "Salary must be a number";
    if (!formData.skills.trim()) newErrors.skills = "At least one skill required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- memoized boolean for immediate disabling/enabling of Next button ----
  const isCurrentStepValid = useMemo(() => {
    if (currentStep === 1) return checkStep1Valid();
    if (currentStep === 2) return checkStep2Valid();
    if (currentStep === 3) return checkStep3Valid();
    return true;
  }, [currentStep, formData]);

  // ---- navigation ----
  const handleNext = () => {
    // run validators that set errors so user sees inline messages
    let ok = true;
    if (currentStep === 1) ok = validateStep1AndSetErrors();
    if (currentStep === 2) ok = validateStep2AndSetErrors();
    if (currentStep === 3) ok = validateStep3AndSetErrors();

    if (!ok) return; // don't go forward if invalid

    setErrors({}); // clear errors when moving forward
    setCurrentStep((s) => (s < totalSteps ? s + 1 : s));
  };

  const handlePrev = () => {
    setErrors({});
    setCurrentStep((s) => (s > 1 ? s - 1 : s));
  };

  // ---- final submit handler (Step 4) ----
  const handleSubmit = (e) => {
    e.preventDefault();
    // ensure step3 is valid before submit (revalidate)
    if (!validateStep3AndSetErrors()) {
      setCurrentStep(3);
      return;
    }

    // simulate submission
    console.log("Submitting", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="app-container">
      <CanvasBackground />

      <div className="form-wrapper" role="region" aria-labelledby="form-title">
        <h1 id="form-title" className="form-title">Multi-Step Registration</h1>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit} noValidate>
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

          <div style={{ marginTop: 20 }}>
            {currentStep < 4 ? (
              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                nextStep={handleNext}
                prevStep={handlePrev}
                isStepValid={isCurrentStepValid}
              />
            ) : (
              <button type="submit" className="submit-btn" disabled={!checkStep3Valid()}>
                Submit
              </button>
            )}
          </div>
        </form>

        <p className="step-count">Step {currentStep} of {totalSteps}</p>
      </div>
    </div>
  );
}

export default App;
