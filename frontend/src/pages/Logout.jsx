import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Checking login status...');
    const token = localStorage.getItem('token');
    if (token) {
      console.log('User is logged in. Token:', token);
    } else {
      console.warn('No token found. Redirecting to login...');
      alert('Please login first!');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome! You are logged in.</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
