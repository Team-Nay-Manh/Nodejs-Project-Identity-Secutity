
import { useState } from 'react';

export const useAddress = (initialState = {}) => {
  const [formData, setFormData] = useState({
    street: initialState.street || '',
    city: initialState.city || '',
    state: initialState.state || '',
    country: initialState.country || '',
  });

  const [errors, setErrors] = useState({});

  const validateAddress = () => {
    const newErrors = {};
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const getFormattedAddress = () => {
    return `${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}`;
  };

  return {
    formData,
    errors,
    handleChange,
    validateAddress,
    getFormattedAddress,
  };
};