import React, { useState } from 'react';
import axios from 'axios';

const CreateForum = () => {
  const baseURL = process.env.REACT_APP_BASE_URL; // Ensure this is correctly set in your .env
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation errors:", errors);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken'); // Fetch token from localStorage

      const response = await axios.post(
        `${baseURL}/api/v1/forum-post/create`,
        formData,
        {
          headers: {
            'x-access-token': token, // Include the token in the headers
          },
        }
      );

      const responseMessage = response.data?.message || 'Forum created successfully.';
      setMessage(responseMessage);
      console.log('Forum created successfully:', response.data);
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating forum:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Forum</h2>
      {message && <p>{typeof message === 'string' ? message : JSON.stringify(message)}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'is-invalid' : ''}
              required
            />
          </label>
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'is-invalid' : ''}
              required
            />
          </label>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Forum'}
        </button>
      </form>
    </div>
  );
};

export default CreateForum;
