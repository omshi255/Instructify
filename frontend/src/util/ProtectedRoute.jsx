// export default ProtectedRoute;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source(); // ✅ CancelToken create

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token while checking auth:", token); // 🔍 Debug log

      if (!token) {
        console.log("No token found, redirecting to login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("ProtectedRoute: current user", res.data.user); // 🔍 Debug log

        if (res.data.user) {
          setUser(res.data.user);
        } else {
          console.log("User not found in response, removing token.");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.log("Request canceled:", err.message);
        localStorage.removeItem("token"); // 🔥 Clear invalid token
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      source.cancel("Request canceled due to component unmount"); // ✅ Cancel on unmount
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
