import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub, FaDiscord, FaInstagram, FaTwitter, FaFacebook, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom"; // Use React Router for navigation
import './FindConnections.css';
import Footer from "../components/Footer.jsx"; // Adjust the import path as necessary
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "/api/auth/all-users"
        );
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <div className="users-list">
      <h2 className="register-user-heading"><i class="fas fa-users"></i>All Registered Users</h2>
      <div className="users-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <img
              src={user.profilePic || "https://via.placeholder.com/150"}
              alt={user.name}
              className="user-avatar"
            />
        <div class="user-profile">
  <h3 class="user-name">
    <i class="fas fa-user user-icon"></i> {user.name}
  </h3>
  <p class="user-email">
    <strong>Email:</strong> {user.email}
  </p>
  <p class="user-bio">
    <strong>Bio:</strong> {user.bio}
  </p>
  <p class="user-interests">
    <strong>Learning Interests:</strong> {user.learningInterests?.join(", ")}
  </p>
  <p class="user-description">
    <strong>Description:</strong> {user.description}
  </p>
</div>


            {/* Social Links with Icons */}
            <div className="social-icons">
              {user.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={20} title="LinkedIn" />
                </a>
              )}
              {user.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} title="GitHub" />
                </a>
              )}
              {user.discord && (
                <a href={user.discord} target="_blank" rel="noopener noreferrer">
                  <FaDiscord size={20} title="Discord" />
                </a>
              )}
              {user.instagram && (
                <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={20} title="Instagram" />
                </a>
              )}
              {user.twitter && (
                <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={20} title="Twitter" />
                </a>
              )}
              {user.facebook && (
                <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={20} title="Facebook" />
                </a>
              )}
              {user.portfolio && (
                <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
                  <FaGlobe size={20} title="Portfolio" />
                </a>
              )}
            </div>

            {/* Visit Courses Button */}
            <Link to={`/mycourses/${user._id}`} className="visit-courses-btn">
<p>  Visit Courses</p>
</Link>




          </div>
        ))}
      </div>
    
    </div>
      <Footer/>
    </>
  );
};

export default UsersList;
