import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css'; // Import your CSS styles

const AdminLogin = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL; // Ensure this is set correctly
  const [message, setMessage] = React.useState(''); // State for messages
  const [loading, setLoading] = React.useState(false); // Loading state

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMessage(''); // Clear any previous messages

      try {
        const response = await axios.post(
          `${baseURL}/api/v1/admins/login`, // Adjust the URL as per your API endpoint
          values,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Login successful:', response.data);
        const { token, admin_id } = response.data; // Extract token and admin_id
        localStorage.setItem('authToken', token); // Store token in local storage
        localStorage.setItem('admin_id', admin_id); // Store admin_id in local storage

        setMessage('Login successful! Redirecting...'); // Set success message
        setTimeout(() => {
          navigate('/admin/dashboard'); // Redirect after 2 seconds
        }, 2000);
      } catch (error) {
        console.error('Error during login:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
        setMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='login'>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          {message && <p className="login-message">{message}</p>} {/* Display messages */}
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">Enter your email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={formik.touched.email && formik.errors.email ? 'is-invalid' : ''}
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
                className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="login-options">
              <a>Press Login Button</a>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="signup-link">
            <span>Don't have an Admin account? </span>
            <Link to="/adminregister">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminLogin;
