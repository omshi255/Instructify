// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get('/api/auth/me', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add Bearer token
//           },
//         });
//         console.log("protecterRoute : curr user ", res.data.user)
//         setUser(res.data.user);
//       } catch (err) {
//         console.error('Error fetching profile:', err.response?.data || err.message);
//         localStorage.removeItem('token'); // Clear invalid token
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();

//     // Cleanup for axios cancellation
//     const source = axios.CancelToken.source();
//     return () => {
//       source.cancel('Request canceled due to component unmount');
//     };
//   }, []); // Empty dependency array to run only once

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return user ? children : <Navigate to="/login" />;
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal, // ✅ use signal for cancellation
        });
        console.log('ProtectedRoute: current user', res.data.user);
        setUser(res.data.user);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          console.error('Error fetching profile:', err.response?.data || err.message);
          localStorage.removeItem('token');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      controller.abort(); // ✅ cancel the request if unmount
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};
