import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import axios from "axios";

const CreatePosition = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [positionName, setPositionName] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setPositionName(value);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!positionName.trim()) {
      newErrors.reason = "Position name is required";
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
      const { data } = await axios.post(
        `${baseURL}/api/v1/migraine-position/create-new-position`,
        { positionName },
        {
          headers: {
            "x-access-token": `${localStorage.getItem("authToken")}`,
          },
        }
      );

      setShowPopup(true);
      setMessage(data.message || "Position created successfully.");
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
      setPositionName("");
    }
  };

  const handleReset = () => {
    setPositionName("");
    setErrors({});
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="pageheading">
          <h6>Create Migraine Position</h6>
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
                <label htmlFor="position" className="form-label">
                  Position name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.positionName && "is-invalid"}`}
                  name="position"
                  id="position"
                  onChange={handleChange}
                  value={positionName}
                  placeholder="Enter position"
                  required
                />
                {errors.reason && (
                  <div className="invalid-feedback">{errors.positionName}</div>
                )}
              </div>

              {/* Image Upload Field */}
              {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                {formData.image && (
                  <div>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt=""
                      className="img-thumbnail img-fluid mb-3"
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
              </div> */}
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Position"}
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

export default CreatePosition;
