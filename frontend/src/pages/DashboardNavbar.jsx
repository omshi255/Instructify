import React, { useState, useEffect } from "react";
import "../pages/Dashboardnavbar.css";
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
            <a href="/Dashboard">Dashboard</a>
          </li>

          <li className="dropdown" onClick={toggleDropdown}>
            <a href="#services" className="dropdown-toggle">
              Services <i className={`fas fa-caret-${dropdownOpen ? "up" : "down"}`} />
            </a>
            {dropdownOpen && (
              <ul className="dropdown-content">
                {/* Dropdown links, all pointing to /dashboard/bookmarked */}
                <li>
                  <Link to="/dashboard/bookmarked">App Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Web Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">AI & Machine Learning</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Data Science</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Cloud Computing</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Cybersecurity</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Blockchain Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Game Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Database Management</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">DevOps</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">IoT (Internet of Things)</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Augmented Reality (AR)</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Virtual Reality (VR)</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Flutter Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">React.js Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Node.js Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Vue.js Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Python Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">C++ Programming</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Java Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Kotlin Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Swift Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">PHP Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Ruby on Rails</Link>
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
          <li><a href="/" onClick={toggleMenu}>Explore</a></li>
          <li>
            <a href="#services" onClick={toggleDropdown}>
              Categories <i className={`fas fa-caret-${dropdownOpen ? "up" : "down"}`} />
            </a>
            {dropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li>
                  <Link to="/dashboard/bookmarked">App Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Web Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">AI & Machine Learning</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Data Science</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Cloud Computing</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Cybersecurity</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Blockchain Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Game Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Database Management</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">DevOps</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">IoT (Internet of Things)</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Augmented Reality (AR)</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Virtual Reality (VR)</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Flutter Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">React.js Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Node.js Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Vue.js Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Python Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">C++ Programming</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Java Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Kotlin Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Swift Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">PHP Development</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookmarked">Ruby on Rails</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="search-bar">
            <input type="text" placeholder="Search..." className="search-input" />
            <i className="fas fa-search search-icon"></i>
          </li>
          <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/register" className="btn signup-btn">Sign Up</Link>
            </>
          ) : (
            <>
              <img src={user.profilePic} alt="Profile" className="profile-pic" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
              <button onClick={handleLogout} className="btn logout-btn">Logout</button>
            </>
          )}
        </div>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
