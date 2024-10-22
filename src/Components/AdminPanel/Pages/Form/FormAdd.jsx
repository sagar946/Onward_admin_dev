import { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const FormAdd = () => {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Admin || Form";
  }, []);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setInputState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setInputState((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!inputState.patient_name || !inputState.patient_name.trim()) {
      newErrors.patient_name = "Patient name is required";
    }

    if (
      inputState.guardian_name &&
      inputState.guardian_name.trim() &&
      inputState.guardian_name.length < 3
    ) {
      newErrors.guardian_name = "Guardian name must be at least 3 characters";
    }

    if (!inputState.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!inputState.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (inputState.qualification === "default" || !inputState.qualification) {
      newErrors.qualification = "Qualification is required";
    }

    if (!inputState.phone_no) {
      newErrors.phone_no = "Phone number is required";
    } else if (!/^\d{10}$/.test(inputState.phone_no)) {
      newErrors.phone_no = "Phone number must be 10 digits";
    }

    if (!inputState.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inputState.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (
      inputState.document &&
      !["image/jpeg", "image/png"].includes(inputState.document.type)
    ) {
      newErrors.document = "Document must be a JPEG or PNG image";
    }

    if (!inputState.address || !inputState.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted successfully:", inputState);
    if (validateForm()) {
      console.log("Form submitted successfully:", inputState);
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const handleReset = () => {
    setInputState({});
    setErrors({});
  };

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="pageheading">
          <h6>Form</h6>
          <div>
            <button onClick={() => navigate(-1)}>
              <TiArrowBackOutline className="headicon" /> Back
            </button>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="mid-container">
          <form onSubmit={handleSubmit}>
            <div className="row mt-1">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="patient_name" className="form-label">
                  Patient Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.patient_name && "is-invalid"
                  }`}
                  name="patient_name"
                  id="patient_name"
                  onChange={handleChange}
                  value={inputState.patient_name || ""}
                  placeholder="Enter patient name"
                />
                {errors.patient_name && (
                  <div className="invalid-feedback">{errors.patient_name}</div>
                )}
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="guardian_name" className="form-label">
                  Guardian Name
                </label>
                <input
                  type="text"
                  name="guardian_name"
                  id="guardian_name"
                  placeholder="Enter guardian name"
                  className={`form-control ${
                    errors.guardian_name && "is-invalid"
                  }`}
                  value={inputState.guardian_name || ""}
                  onChange={handleChange}
                />
                {errors.guardian_name && (
                  <div className="invalid-feedback">{errors.guardian_name}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label className="form-label d-block">Gender</label>
                <div
                  className={`form-control ${errors.gender && "is-invalid"}`}
                >
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="gender_male"
                      value="Male"
                      checked={inputState.gender === "Male"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="gender_male">
                      Male
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="gender_female"
                      value="Female"
                      checked={inputState.gender === "Female"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="gender_female">
                      Female
                    </label>
                  </div>
                </div>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="dob" className="form-label">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.dob && "is-invalid"}`}
                  name="dob"
                  id="dob"
                  onChange={handleChange}
                  value={inputState.dob || ""}
                />
                {errors.dob && (
                  <div className="invalid-feedback">{errors.dob}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="qualification" className="form-label">
                  Qualification
                </label>
                <select
                  name="qualification"
                  id="qualification"
                  onChange={handleChange}
                  value={inputState.qualification || "default"}
                  className={`form-control ${
                    errors.qualification && "is-invalid"
                  }`}
                >
                  <option value="default">----Select----</option>
                  <option value="high_school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
                {errors.qualification && (
                  <div className="invalid-feedback">{errors.qualification}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="phone_no" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.phone_no && "is-invalid"}`}
                  name="phone_no"
                  id="phone_no"
                  onChange={handleChange}
                  value={inputState.phone_no || ""}
                  placeholder="Enter phone number"
                />
                {errors.phone_no && (
                  <div className="invalid-feedback">{errors.phone_no}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="email" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={inputState.email || ""}
                  placeholder="Enter email id"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                <label htmlFor="document" className="form-label">
                  Document
                </label>
                <input
                  type="file"
                  className={`form-control ${errors.document && "is-invalid"}`}
                  name="document"
                  id="document"
                  onChange={handleChange}
                />
                {errors.document && (
                  <div className="invalid-feedback">{errors.document}</div>
                )}
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  className={`form-control ${errors.address && "is-invalid"}`}
                  name="address"
                  id="address"
                  onChange={handleChange}
                  value={inputState.address || ""}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
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
    </>
  );
};

export default FormAdd;
