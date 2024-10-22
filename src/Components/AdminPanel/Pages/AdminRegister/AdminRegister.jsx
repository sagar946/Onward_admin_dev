import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminRegister.css';

const AdminRegister = () => {
  const [message, setMessage] = useState(''); // State for the message
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BASE_URL;
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be 50 characters or less')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^[a-z0-9._%+-]+@(gmail|yahoo)\.(com|in)$/, 'Email must be lowercase and end with @gmail.com, @yahoo.com, or another .com or .in domain')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      let data = JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseURL}api/v1/admins/register`, 
        headers: { 
          'Content-Type': 'application/json',
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        console.log('Registration successful:', response.data);
        
        setMessage('Registration successful! Redirecting...'); // Set success message
        setTimeout(() => {
          navigate('/adminlogin'); // Redirect after 2 seconds
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Handle email conflict error
          setMessage('Admin with this email already exists.');
        } else {
          console.error('Registration error:', error);
          setMessage('Registration failed. Please try again.'); // General error message
        }
      }
    },
  });

  return (
    <div className='register'>
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name">Enter your name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password">Enter your password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>} {/* Display the registration message */}
      </div>
    </div>
    </div>
  );
};

export default AdminRegister;
