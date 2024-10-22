import React, { useState } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import '../../Styles/AdminPages.css';

const CreateDonation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    admin_id: localStorage.getItem('admin_id') || '',  // Retrieve admin_id from local storage,
    foundationName: '',
    title: '',
    description: '',
    targetAmount: '',
    startDate: '',
    endDate: '',
    donation_status: 'Active',
    image: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.foundationName.trim()) {
      newErrors.foundationName = "Foundation Name is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.targetAmount) {
      newErrors.targetAmount = "Target amount is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.log('Form has errors:', errors);
      return;
    }
  
    setLoading(true);
    setMessage('');
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('admin_id', formData.admin_id);
      formDataToSend.append('foundationName', formData.foundationName);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('targetAmount', formData.targetAmount);
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('endDate', formData.endDate);
      formDataToSend.append('donation_status', formData.donation_status);
      formDataToSend.append('image', formData.image);


      const baseURL =process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${baseURL}/api/v1/donation-post/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formDataToSend,
      });
  
      // Log response details
      const data = await response.json();
      console.log('Response Status:', response.status);
      console.log('Response Data:', data);
  
      if (response.ok) {
        setMessage(data.message || 'Donation created successfully.');
        setShowPopup(true);
        setFormData({
          admin_id: localStorage.getItem('admin_id') || '',
          foundationName: '',
          title: '',
          description: '',
          targetAmount: '',
          startDate: '',
          endDate: '',
          donation_status: 'Active',
          image: null,
        });
      } else {
        setMessage(data.message || 'Failed to create donation.');
      }
    } catch (error) {
      console.error('Request Error:', error);
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setFormData({
      admin_id: localStorage.getItem('admin_id') || '',
      foundationName: '',
      title: '',
      description: '',
      targetAmount: '',
      startDate: '',
      endDate: '',
      donation_status: 'Active',
      image: null,
    });
    setErrors({});
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="pageheading">
          <h6>Create Donation</h6>
          <div>
            <button onClick={() => navigate(-1)}>
              <TiArrowBackOutline className="headicon" /> Back
            </button>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="mid-container">
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="row mt-1">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="foundationName" className="form-label">
                  Foundation Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.foundationName && "is-invalid"}`}
                  name="foundationName"
                  id="foundationName"
                  onChange={handleChange}
                  value={formData.foundationName}
                  placeholder="Enter foundation name"
                  required
                />
                {errors.foundationName && (
                  <div className="invalid-feedback">{errors.foundationName}</div>
                )}
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.title && "is-invalid"}`}
                  name="title"
                  id="title"
                  onChange={handleChange}
                  value={formData.title}
                  placeholder="Enter title"
                  required
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className={`form-control ${errors.description && "is-invalid"}`}
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="Enter description"
                  required
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="targetAmount" className="form-label">
                  Target Amount
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.targetAmount && "is-invalid"}`}
                  name="targetAmount"
                  id="targetAmount"
                  onChange={handleChange}
                  value={formData.targetAmount}
                  placeholder="Enter target amount"
                  required
                />
                {errors.targetAmount && (
                  <div className="invalid-feedback">{errors.targetAmount}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="startDate" className="form-label">
                Start Date
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.startDate && "is-invalid"}`}
                  name="startDate"
                  id="startDate"
                  onChange={handleChange}
                  value={formData.startDate}
                  required
                />
                {errors.startDate && (
                  <div className="invalid-feedback">{errors.startDate}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="endDate" className="form-label">
                End Date
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.endDate && "is-invalid"}`}
                  name="endDate"
                  id="endDate"
                  onChange={handleChange}
                  value={formData.endDate}
                  required
                />
                {errors.endDate && (
                  <div className="invalid-feedback">{errors.endDate}</div>
                )}
              </div>

              {/* Image Upload Field */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className={`form-control ${errors.image && "is-invalid"}`}
                  name="image"
                  id="image"
                  onChange={handleChange}
                  required
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
              {loading ? 'Creating...' : 'Create Donation'}
            </button>
            <button
              type="button"
              className="btn btn-secondary mx-1 mt-2"
              onClick={handleReset}
            >
              Reset
            </button>
          </form>
        </div>
      </div>

      {/* Popup Component */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h5>{message}</h5>
            <button className="btn btn-primary" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateDonation;
