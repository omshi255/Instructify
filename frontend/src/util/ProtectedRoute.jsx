import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        });
        console.log("protecterRoute : curr user ", res.data.user)
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err.response?.data || err.message);
        localStorage.removeItem('token'); // Clear invalid token
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Cleanup for axios cancellation
    const source = axios.CancelToken.source();
    return () => {
      source.cancel('Request canceled due to component unmount');
    };
  }, []); // Empty dependency array to run only once

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;