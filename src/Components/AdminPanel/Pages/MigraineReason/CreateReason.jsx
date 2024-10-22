import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import axios from "axios";

const CreateReason = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    image: null,
  });

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

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
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
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.reason);
      formDataToSend.append("image", formData.image);

      const { data } = await axios.post(
        `${baseURL}/api/v1/migraine-reason/create-new-reason`,
        formDataToSend,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("authToken")}`,
          },
        }
      );

      setShowPopup(true);
      setMessage(data.message || "Reason created successfully.");
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
      setFormData({
        reason: "",
        image: "",
      });
      e.target.reset();
    }
  };

  const handleReset = () => {
    setFormData({
      reason: "",
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
          <h6>Create Migraine Reason</h6>
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
                <label htmlFor="reason" className="form-label">
                  Reason
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.reason && "is-invalid"}`}
                  name="reason"
                  id="reason"
                  onChange={handleChange}
                  value={formData.reason}
                  placeholder="Enter reason"
                  required
                />
                {errors.reason && (
                  <div className="invalid-feedback">{errors.reason}</div>
                )}
              </div>

              {/* Image Upload Field */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                {formData.image && (
                  <div>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt=""
                      className="img-thumbnail img-fluid mb-3 w-25"
                    />
                  </div>
                )}

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

            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Reason"}
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
            <button className="btn btn-primary" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateReason;
