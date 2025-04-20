import React, { useState, useEffect } from "react";
import "../components/navbar.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,  // Yeh line zaroori hai
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <i className="fas fa-graduation-cap"></i>
          <span className="logo-text">
            <span className="text-primary">Instruct</span>
            <span className="text-accent">ify</span>
          </span>
        </div>

        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>

          <li className="dropdown" onClick={toggleDropdown}>
            <a href="#services" className="dropdown-toggle">
              Services <i className={`fas fa-caret-${dropdownOpen ? "up" : "down"}`} />
            </a>
            {dropdownOpen && (
              <ul className="dropdown-content">
                <li>
                  <a href="#service1">App Development</a>
                </li>
                <li>
                  <a href="#service2">Web Development</a>
                </li>
                <li>
                  <a href="#service3">AI & Machine Learning</a>
                </li>
                <li>
                  <a href="#service4">Data Science</a>
                </li>
                <li>
                  <a href="#service5">Cloud Computing</a>
                </li>
                <li>
                  <a href="#service6">Cybersecurity</a>
                </li>
                <li>
                  <a href="#service7">Blockchain Development</a>
                </li>
                <li>
                  <a href="#service8">Game Development</a>
                </li>
                <li>
                  <a href="#service9">Database Management</a>
                </li>
                <li>
                  <a href="#service10">DevOps</a>
                </li>
                <li>
                  <a href="#service11">IoT (Internet of Things)</a>
                </li>
                <li>
                  <a href="#service12">Augmented Reality (AR)</a>
                </li>
                <li>
                  <a href="#service13">Virtual Reality (VR)</a>
                </li>
                <li>
                  <a href="#service14">Flutter Development</a>
                </li>
                <li>
                  <a href="#service15">React.js Development</a>
                </li>
                <li>
                  <a href="#service16">Node.js Development</a>
                </li>
                <li>
                  <a href="#service17">Vue.js Development</a>
                </li>
                <li>
                  <a href="#service18">Python Development</a>
                </li>
                <li>
                  <a href="#service19">C++ Programming</a>
                </li>
                <li>
                  <a href="#service20">Java Development</a>
                </li>
                <li>
                  <a href="#service21">Kotlin Development</a>
                </li>
                <li>
                  <a href="#service22">Swift Development</a>
                </li>
                <li>
                  <a href="#service23">PHP Development</a>
                </li>
                <li>
                  <a href="#service24">Ruby on Rails</a>
                </li>
              </ul>
            )}
          </li>
          <li className="search-bar">
            <input type="text" placeholder="Search..." className="search-input" />
            <i className="fas fa-search search-icon"></i>
          </li>
        </ul>

        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/register" className="btn signup-btn">Sign Up</Link>
            </>
          ) : (
            <>
              {/* <span className="user-email">{user.email}</span> */}
              <img src={user.profilePic} alt="Profile" className="profile-pic" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
              <button onClick={handleLogout} className="btn logout-btn">Logout</button>
            </>
          )}
        </div>

        <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <ul>
          <li><a href="#home" onClick={toggleMenu}>Explore</a></li>
          <li>
            <a href="#services" onClick={toggleDropdown}>
              Categories <i className={`fas fa-caret-${dropdownOpen ? "up" : "down"}`} />
            </a>
            {dropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li>
                  <a href="#service1">App Development</a>
                </li>
                <li>
                  <a href="#service2">Web Development</a>
                </li>
                <li>
                  <a href="#service3">AI & Machine Learning</a>
                </li>
                <li>
                  <a href="#service4">Data Science</a>
                </li>
                <li>
                  <a href="#service5">Cloud Computing</a>
                </li>
                <li>
                  <a href="#service6">Cybersecurity</a>
                </li>
                <li>
                  <a href="#service7">Blockchain Development</a>
                </li>
                <li>
                  <a href="#service8">Game Development</a>
                </li>
                <li>
                  <a href="#service9">Database Management</a>
                </li>
                <li>
                  <a href="#service10">DevOps</a>
                </li>
                <li>
                  <a href="#service11">IoT (Internet of Things)</a>
                </li>
                <li>
                  <a href="#service12">Augmented Reality (AR)</a>
                </li>
                <li>
                  <a href="#service13">Virtual Reality (VR)</a>
                </li>
                <li>
                  <a href="#service14">Flutter Development</a>
                </li>
                <li>
                  <a href="#service15">React.js Development</a>
                </li>
                <li>
                  <a href="#service16">Node.js Development</a>
                </li>
                <li>
                  <a href="#service17">Vue.js Development</a>
                </li>
                <li>
                  <a href="#service18">Python Development</a>
                </li>
                <li>
                  <a href="#service19">C++ Programming</a>
                </li>
                <li>
                  <a href="#service20">Java Development</a>
                </li>
                <li>
                  <a href="#service21">Kotlin Development</a>
                </li>
                <li>
                  <a href="#service22">Swift Development</a>
                </li>
                <li>
                  <a href="#service23">PHP Development</a>
                </li>
                <li>
                  <a href="#service24">Ruby on Rails</a>
                </li>
              </ul>
            )}
          </li>
          <li className="search-bar">
            <input type="text" placeholder="Search..." className="search-input" />
            <i className="fas fa-search search-icon"></i>
          </li>
          {user && (
            <>
              <img src={user.profilePic} alt="profile" className="profile-pic" />
              {/* <span className="user-email">{user.email}</span> */}
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;