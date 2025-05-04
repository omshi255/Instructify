import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import animationData from "../animations/Animation - 1745128919432.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx"; // Import Footer component
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 loader state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login page");
    setLoading(true); // 👈 Start loader
    try { 
      console.log(email, password);
      const response = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      toast.success("Login successful!", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
        transition: "zoom",
      });

      setTimeout(() => {
        setLoading(false); // 👈 Stop loader before navigation
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setLoading(false); // 👈 Stop loader on error
      toast.error("Login failed. Check your credentials.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        closeButton: true,
        transition: Zoom,
      });
    }
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lottie options configuration
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getLottieSize = () => {
    if (windowWidth >= 1024) {
      return { height: 400, width: 400 }; // Large screens
    } else if (windowWidth >= 768) {
      return { height: 300, width: 300 }; // Medium screens
    } else {
      return { height: 200, width: 200 }; // Small screens
    }
  };
  const { height, width } = getLottieSize();
  return (
    <>
      <Navbar />

      {/* 👇 Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <div className="loader-text">Logging in... , please wait</div>
        </div>
      )}

      <div className="login-container">
        <div className="login-left">
          <div className="lottie-container">
            <Lottie options={defaultOptions} height={height} width={width} />
          </div>
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
                type={showPassword ? "text" : "password"}
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
            <br />
            <br />
          </form>
          <p>
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

        {/* Toast container */}
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
      <Footer />
    </>
  );
};

export default Login;
