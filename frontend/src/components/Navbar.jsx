import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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

        {/* Desktop Menu */}
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#explore">Explore</a>
          </li>

          {/* Services Dropdown */}
          <li className="dropdown" onClick={toggleDropdown}>
            <a href="#services" className="dropdown-toggle">
              Catagories{" "}
              <i className={`fas fa-caret-${dropdownOpen ? "up" : "down"}`} />
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
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </li>
          <li></li>
        </ul>

        {/* Buttons */}
        <div className="navbar-actions">
  <Link to="/login" className="btn login-btn">Login</Link>
  <Link to="/register" className="btn signup-btn">Sign Up</Link>
</div>


        {/* Hamburger Icon */}
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <ul>
          <li>
            <a href="#home" onClick={toggleMenu}>
              Explore
            </a>
          </li>

          {/* Mobile Services Dropdown */}
          <li>
            <a href="#services" onClick={toggleDropdown}>
              Catagories{" "}
              <i className={`fas fa-caret-${dropdownOpen ? "up" : "down"}`} />
            </a>
            {dropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li>
                  <a href="#service1" onClick={toggleMenu}>
                    App Development
                  </a>
                </li>
                <li>
                  <a href="#service2" onClick={toggleMenu}>
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#service3" onClick={toggleMenu}>
                    AI & Machine Learning
                  </a>
                </li>
                <li>
                  <a href="#service4" onClick={toggleMenu}>
                    Data Science
                  </a>
                </li>
                <li>
                  <a href="#service5" onClick={toggleMenu}>
                    Cloud Computing
                  </a>
                </li>
                <li>
                  <a href="#service6" onClick={toggleMenu}>
                    Cybersecurity
                  </a>
                </li>
                <li>
                  <a href="#service7" onClick={toggleMenu}>
                    Blockchain Development
                  </a>
                </li>
                <li>
                  <a href="#service8" onClick={toggleMenu}>
                    Game Development
                  </a>
                </li>
                <li>
                  <a href="#service9" onClick={toggleMenu}>
                    Database Management
                  </a>
                </li>
                <li>
                  <a href="#service10" onClick={toggleMenu}>
                    DevOps
                  </a>
                </li>
                <li>
                  <a href="#service11" onClick={toggleMenu}>
                    IoT (Internet of Things)
                  </a>
                </li>
                <li>
                  <a href="#service12" onClick={toggleMenu}>
                    Augmented Reality (AR)
                  </a>
                </li>
                <li>
                  <a href="#service13" onClick={toggleMenu}>
                    Virtual Reality (VR)
                  </a>
                </li>
                <li>
                  <a href="#service14" onClick={toggleMenu}>
                    Flutter Development
                  </a>
                </li>
                <li>
                  <a href="#service15" onClick={toggleMenu}>
                    React.js Development
                  </a>
                </li>
                <li>
                  <a href="#service16" onClick={toggleMenu}>
                    Node.js Development
                  </a>
                </li>
                <li>
                  <a href="#service17" onClick={toggleMenu}>
                    Vue.js Development
                  </a>
                </li>
                <li>
                  <a href="#service18" onClick={toggleMenu}>
                    Python Development
                  </a>
                </li>
                <li>
                  <a href="#service19" onClick={toggleMenu}>
                    C++ Programming
                  </a>
                </li>
                <li>
                  <a href="#service20" onClick={toggleMenu}>
                    Java Development
                  </a>
                </li>
                <li>
                  <a href="#service21" onClick={toggleMenu}>
                    Kotlin Development
                  </a>
                </li>
                <li>
                  <a href="#service22" onClick={toggleMenu}>
                    Swift Development
                  </a>
                </li>
                <li>
                  <a href="#service23" onClick={toggleMenu}>
                    PHP Development
                  </a>
                </li>
                <li>
                  <a href="#service24" onClick={toggleMenu}>
                    Ruby on Rails
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </li>

          <li>
  <Link to="/login" onClick={toggleMenu}>Login</Link>
</li>
<li>
  <Link to="/register" onClick={toggleMenu}>Sign Up</Link>
</li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
