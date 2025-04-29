import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../animations/register-animation.json';
import './Register.css';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState(''); // New state for bio
  const [description, setDescription] = useState(''); // New state for description
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    console.log('📁 Profile picture selected:', e.target.files[0]);
  };

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
      toast.error('Name is required');
      console.log('❌ Name is missing');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      errors.email = 'Email is required';
      toast.error('Email is required');
      console.log('❌ Email is missing');
    } else if (!emailPattern.test(email)) {
      errors.email = 'Enter a valid email';
      toast.error('Enter a valid email');
      console.log('❌ Invalid email format');
    }

    if (!password) {
      errors.password = 'Password is required';
      toast.error('Password is required');
      console.log('❌ Password is missing');
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      toast.error('Password must be at least 6 characters');
      console.log('❌ Password too short');
    }

    if (!bio) {
      errors.bio = 'Bio is required';
      toast.error('Bio is required');
    }

    if (!description) {
      errors.description = 'Description is required';
      toast.error('Description is required');
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 Submit button clicked');

    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    console.log('✅ Form validation passed');
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('bio', bio); // Add bio to form data
    formData.append('description', description); // Add description to form data
    if (profilePic) {
      formData.append('profilePic', profilePic);
      console.log('🖼️ Profile picture attached');
    } else {
      console.log('📁 No profile picture attached');
    }

    console.log('📦 Sending registration request to backend...');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ User registered successfully:', response.data);
      localStorage.setItem('token', response.data.token);
      toast.success('Registration successful! Please login.');

      setTimeout(() => {
        console.log('🔁 Redirecting to login page...');
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      console.error('❌ Registration error:', error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="register-container">
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
            <p style={{ color: '#38a169', marginTop: '10px' }}>Registering, please wait...</p>
          </div>
        )}

        <div className="register-left">
          <Player autoplay loop src={animationData} style={{ height: '400px', width: '400px' }} />
        </div>

        <div className="register-right">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            {errors.name && <div className="error">{errors.name}</div>}

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {errors.email && <div className="error">{errors.email}</div>}

            <div className="password-input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-eye" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <div className="error">{errors.password}</div>}

            {/* Bio input */}
            <textarea
              placeholder="Write a short bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
            />
            {errors.bio && <div className="error">{errors.bio}</div>}

            {/* Description input */}
            <textarea
              placeholder="Describe yourself"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
            {errors.description && <div className="error">{errors.description}</div>}

            <input type="file" onChange={handleFileChange} />
            <button type="submit">Register</button>
          </form>
          <br />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Zoom}
        />
      </div>
    </>
  );
};

export default Register;
