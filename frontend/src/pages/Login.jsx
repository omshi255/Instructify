import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { ToastContainer, toast , Zoom } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './Login.css';
import animationData from '../animations/Animation - 1745128919432.json'; // Update path as per your file structure
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar'; // For the eye icon to toggle password visibility

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    try {
      console.log('Sending login request to backend...');
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Backend responded with:', response.data);
      localStorage.setItem('token', response.data.token);
      console.log('Token saved in localStorage');

      // Show success toast after successful login
      toast.success('Login successful!', {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
        transition: "zoom", // Add zoom transition
      });

      // Navigate to another page after successful login
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 2000); // Delay navigation to ensure toast is shown first

    } catch (error) {
      console.error('Login failed. Backend error:', error.response ? error.response.data : error.message);
      
      // Show error toast in case of login failure
      toast.error('Login failed. Check your credentials.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false, // 👈 Show progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        closeButton: true, // 👈 Show cross button
        transition: Zoom,  // 👈 Make sure to import Zoom
      });
    }
  };

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
    <Navbar/>
    <div className="login-container">
      <div className="login-left">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>

      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <br />
          <button type="submit">Login</button>
          <br/>
          <br />
        </form>
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      {/* Toastify container for notifications */}
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  transition="zoom"
/>
    </div>
    </> );
};

export default Login;
