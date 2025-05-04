import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../animations/register-animation.json';
import './Register.css';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Footer from '../components/Footer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faUpload,
  faInfoCircle,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faGithub,
  faDiscord,
  faTwitter,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

import Navbar from '../components/Navbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState('');
  const [description, setDescription] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [discord, setDiscord] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleSocialLinks = () => setShowSocialLinks((prev) => !prev);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    console.log('📁 Profile picture selected:', e.target.files[0]);
  };

  const validateForm = () => {
    const errors = {};
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!name) {
      errors.name = 'Name is required';
      toast.error('Name is required');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      errors.email = 'Email is required';
      toast.error('Email is required');
    } else if (!emailPattern.test(email)) {
      errors.email = 'Enter a valid email';
      toast.error('Enter a valid email');
    }

    if (!password) {
      errors.password = 'Password is required';
      toast.error('Password is required');
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      toast.error('Password must be at least 6 characters');
    }

    if (!bio) {
      errors.bio = 'Bio is required';
      toast.error('Bio is required');
    }

    if (!description) {
      errors.description = 'Description is required';
      toast.error('Description is required');
    }

    if (linkedin && !urlPattern.test(linkedin)) {
      errors.linkedin = 'Invalid LinkedIn URL';
      toast.error('Invalid LinkedIn URL');
    }

    if (github && !urlPattern.test(github)) {
      errors.github = 'Invalid GitHub URL';
      toast.error('Invalid GitHub URL');
    }

    if (discord && !urlPattern.test(discord)) {
      errors.discord = 'Invalid Discord URL';
      toast.error('Invalid Discord URL');
    }

    if (twitter && !urlPattern.test(twitter)) {
      errors.twitter = 'Invalid Twitter URL';
      toast.error('Invalid Twitter URL');
    }

    if (instagram && !urlPattern.test(instagram)) {
      errors.instagram = 'Invalid Instagram URL';
      toast.error('Invalid Instagram URL');
    }

    if (facebook && !urlPattern.test(facebook)) {
      errors.facebook = 'Invalid Facebook URL';
      toast.error('Invalid Facebook URL');
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('bio', bio);
    formData.append('description', description);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    formData.append('linkedin', linkedin);
    formData.append('github', github);
    formData.append('discord', discord);
    formData.append('twitter', twitter);
    formData.append('instagram', instagram);
    formData.append('facebook', facebook);

    try {
      const response = await axios.post(
        "/api/auth/register",
        formData, 
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success('Registration successful! Redirecting...');
      localStorage.setItem('token', response.data.token);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
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
          <h2 className='head-register'>Create Account</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="input-with-icon">
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="password-input input-with-icon">
              <FontAwesomeIcon icon={faLock} />
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-eye" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="input-with-icon">
              <FontAwesomeIcon icon={faInfoCircle} />
              <textarea placeholder="Short bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <div className="input-with-icon">
              <FontAwesomeIcon icon={faInfoCircle} />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="input-with-icon">
              <FontAwesomeIcon icon={faUpload} />
              <input type="file" onChange={handleFileChange} />
            </div>

            <div className="social-section">
              <button type="button" className="toggle-social-btn" onClick={toggleSocialLinks}>
                <FontAwesomeIcon icon={faLink} style={{ marginRight: '6px' }} />
                {showSocialLinks ? 'Hide Social Links ▲' : 'Add Social Links ▼'}
              </button>

              {showSocialLinks && (
                <div className="social-links-box">
                  <FontAwesomeIcon icon={faLinkedin} />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faGithub} />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faDiscord} />
                  <input
                    type="url"
                    placeholder="Discord URL"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faTwitter} />
                  <input
                    type="url"
                    placeholder="Twitter URL"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faInstagram} />
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faFacebook} />
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              )}
            </div>

            <button type="submit">Register</button>
          </form>

          <p style={{ marginTop: '10px' }}>
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
      <Footer/>
    </>
  );
};

export default Register;
