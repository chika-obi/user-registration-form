import React from "react";
import "./Step2Address.css";

function Step2Address({ formData, setFormData, errors, setErrors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    switch (name) {
      case "address":
        setErrors({ ...errors, address: value.trim() ? "" : "Address is required" });
        break;
      case "city":
        setErrors({ ...errors, city: value.trim() ? "" : "City is required" });
        break;
      case "state":
        setErrors({ ...errors, state: value.trim() ? "" : "State is required" });
        break;
      case "postalCode":
        setErrors({
          ...errors,
          postalCode: /^\d{6}$/.test(value) ? "" : "Postal code must be 6 digits",
        });
        break;
      case "country":
        setErrors({ ...errors, country: value === "Nigeria" ? "" : "Country must be Nigeria" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="step2-container">
      <label className="step2-label">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="step2-input"
      />
      {errors.address && <p className="step2-error">{errors.address}</p>}

      <label className="step2-label">City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="step2-input"
      />
      {errors.city && <p className="step2-error">{errors.city}</p>}

      <label className="step2-label">State</label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="step2-input"
      />
      {errors.state && <p className="step2-error">{errors.state}</p>}

      <label className="step2-label">Postal Code</label>
      <input
        type="text"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        className="step2-input"
      />
      {errors.postalCode && <p className="step2-error">{errors.postalCode}</p>}

      <label className="step2-label">Country</label>
      <input
        type="text"
        name="country"
        value={formData.country}
        readOnly
        className="step2-input"
      />
      {errors.country && <p className="step2-error">{errors.country}</p>}
    </div>
  );
}

export default Step2Address;
