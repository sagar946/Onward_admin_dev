import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import "../../Styles/AdminPages.css";

const UpdateDonation = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get donation id from URL
  const [formData, setFormData] = useState({
    foundationName: "",
    title: "",
    description: "",
    targetAmount: "",
    startDate: "",
    endDate: "",
    donation_status: "active",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch donation data by ID on component mount
  useEffect(() => {
    const fetchDonation = async () => {
      const baseURL = process.env.REACT_APP_BASE_URL; // Define base URL
      try {
        const response = await fetch(`${baseURL}/api/v1/donation-post/${id}`);
        const data = await response.json();

        setFormData({
          foundationName: data.result.foundationName,
          title: data.result.title,
          description: data.result.description,
          targetAmount: data.result.targetAmount,
          startDate: data.result.startDate.split("T")[0],
          endDate: data.result.endDate.split("T")[0],
          donation_status: data.result.status,
          image: null, // Image upload will be handled separately
        });
      } catch (error) {
        setMessage(`An error occurred: ${error.message}`);
      }
    };

    fetchDonation();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
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

    // Clear validation errors when field changes
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Validate form fields before submission
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form has errors:", errors);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("foundationName", formData.foundationName);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("targetAmount", formData.targetAmount);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("donation_status", formData.donation_status);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const baseURL = process.env.REACT_APP_BASE_URL;
      const response = await fetch(
        `${baseURL}/api/v1/donation-post/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Donation updated successfully.");
        navigate("/admin/read"); // Redirect to donation list page
      } else {
        setMessage(data.message || "Failed to update donation.");
      }
    } catch (error) {
      console.error("Request Error:", error);
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <div className="pageheading">
        <h6>Update Donation</h6>
        <div>
          <button onClick={() => navigate(-1)}>
            <TiArrowBackOutline className="headicon" /> Back
          </button>
        </div>
      </div>
      <div className="mid-container">
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row mt-1">
            {/* Foundation Name Field */}
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
              <label htmlFor="foundationName" className="form-label">
                Foundation Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.foundationName && "is-invalid"
                }`}
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

            {/* Title Field */}
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

            {/* Description Field */}
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

            {/* Target Amount Field */}
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
              <label htmlFor="targetAmount" className="form-label">
                Target Amount
              </label>
              <input
                type="number"
                className={`form-control ${
                  errors.targetAmount && "is-invalid"
                }`}
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

            {/* Start Date Field */}
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

            {/* End Date Field */}
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

            {/* Image Field (Optional) */}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
              <label htmlFor="image" className="form-label">
                Image (Optional)
              </label>
              {formData.image && (
                  <div>
                    <img
                      src={
                        typeof formData.image === "string"
                          ? formData.image
                          : URL.createObjectURL(formData.image)
                      }
                      alt=""
                      className="img-thumbnail img-fluid mb-3"
                    />
                  </div>
                )}

              <input
                type="file"
                className="form-control"
                name="image"
                id="image"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            {/* Donation Status Field */}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
              <label htmlFor="donation_status" className="form-label">
                Donation Status
              </label>
              <select
                className="form-control"
                name="donation_status"
                id="donation_status"
                onChange={handleChange}
                value={formData.donation_status}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Donation"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonation;
