import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // loader CSS yahin hai already

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 👈 loader state

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
    setLoading(true); // 👈 Start loader

    setTimeout(() => {
      localStorage.removeItem('token');
      console.log('Token removed from localStorage');
      setLoading(false); // 👈 Stop loader
      alert('Logged out successfully!');
      navigate('/');
    }, 1500); // Delay added to show loader effect
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <div className="loader-text">Logging out... 👋</div>
        </div>
      )}
      
      <div>
        <h2>Welcome! You are logged in.</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Logout;
