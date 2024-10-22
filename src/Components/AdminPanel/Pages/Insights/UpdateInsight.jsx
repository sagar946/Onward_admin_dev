import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import "../../Styles/AdminPages.css";
import axios from "axios";

const UpdateInsight = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [value, setValue] = useState({
    title: "",
    description: "",
    image: null,
    id: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setValue((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setValue((prev) => ({
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

    if (!value.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!value.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!value.image) {
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
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("insight_image", value.image);
      formData.append("id", value.id);

      const { data } = await axios.post(
        `${baseURL}/api/v1/admins/edit-insight`,
        formData,
        {
          headers: {
            "x-access-token": `${token}`,
          },
        }
      );

      setMessage(data.message || "Blog created successfully.");
      setShowPopup(true);
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
      setValue({
        title: "",
        description: "",
        image: "",
        id: "",
      });
      e.target.reset();
    }
  };

  const handleReset = () => {
    setValue({
      title: "",
      description: "",
      image: null,
      id: "",
    });
    setErrors({});
  
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const getInsight = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${baseURL}/api/v1/admins/insights/${id}`,
          {
            headers: {
              "x-access-token": `${token}`,
            },
          }
        );

        setValue({
          title: data.data.title,
          description: data.data.description,
          image: data.data.insight_image,
          id: data.data._id,
        });
      } catch (error) {
        setMessage(`An error occurred: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getInsight();
  }, []);

  

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="pageheading">
          <h6>Update Migraine Insight</h6>
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
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.title && "is-invalid"}`}
                  name="title"
                  id="title"
                  onChange={handleChange}
                  value={value.title}
                  placeholder="Enter title"
                  required
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.description && "is-invalid"
                  }`}
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={value.description}
                  placeholder="Enter description"
                  required
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Image Upload Field */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                {value.image && (
                  <div>
                    <img
                      src={
                        typeof value.image === "string"
                          ? value.image
                          : URL.createObjectURL(value.image)
                      }
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
              {loading ? "Creating..." : "Update Insight"}
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

export default UpdateInsight;
