import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Setting.css';
import Footer from "../components/Footer.jsx";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [learningInterests, setLearningInterests] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    discord: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    portfolio: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUserNameAndProfilePic = async () => {
    try {
      const res = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data.user;
      setUsername(user.name);
      setUserProfilePic(user.profilePic);
      setBio(user.bio);
      setDescription(user.description);
      setCreatedAt(new Date(user.createdAt).toLocaleString());
      setUpdatedAt(new Date(user.updatedAt).toLocaleString());
      setLearningInterests(user.learningInterests);
      setSocialLinks({
        linkedin: user.linkedin,
        discord: user.discord,
        github: user.github,
        twitter: user.twitter,
        instagram: user.instagram,
        facebook: user.facebook,
        portfolio: user.portfolio,
      });

      let profileCompletionPercentage = 0;
      const fields = [user.name, user.profilePic, user.bio, user.description, user.learningInterests];
      const filledFields = fields.filter(
        (field) => field && (Array.isArray(field) ? field.length > 0 : field.length > 0)
      );
      profileCompletionPercentage = (filledFields.length / fields.length) * 100;

      setProfileCompletion(profileCompletionPercentage);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch("/api/auth/delete-profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile deleted successfully");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to delete profile");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Something went wrong while deleting profile");
    }
  };

  useEffect(() => {
    fetchUserNameAndProfilePic();
  }, []);

  const renderSocialLink = (platform, url, iconClass) => {
    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <i className={`fab ${iconClass}`} style={{ fontSize: "24px", margin: "10px" }}></i>
      </a>
    ) : (
      <p>No {platform} link available</p>
    );
  };

  return (
    <>
    
    <div className="user-profile-card">
      <h3 className="profile-section-heading">
        <i className="fas fa-user-check"></i> Profile Information
      </h3>
      <div className="profile-header-container">
        <img src={userProfilePic} alt="Profile" className="profile-picture" />
        <h2 className="profile-name">{username}</h2>
      </div>
      <p className="profile-detail">
        <strong className="detail-heading">Bio:</strong> {bio || "No bio available"}
      </p>
      <p className="profile-detail">
        <strong className="detail-heading">Description:</strong> {description || "No description available"}
      </p>
      <p className="profile-detail">
        <strong className="detail-heading">Created At:</strong> {createdAt}
      </p>
      <p className="profile-detail">
        <strong className="detail-heading">Updated At:</strong> {updatedAt}
      </p>

      <div className="learning-interests-list">
        <strong>Learning Interests:</strong>
        <ul>
          {learningInterests.length > 0 ? (
            learningInterests.map((interest, index) => <li key={index}>{interest}</li>)
          ) : (
            <li>No learning interests listed</li>
          )}
        </ul>
      </div>

      <div className="social-links">
        <strong>Social Links:</strong>
        <div className="social-icons">
          {renderSocialLink("LinkedIn", socialLinks.linkedin, "fa-linkedin")}
          {renderSocialLink("Discord", socialLinks.discord, "fa-discord")}
          {renderSocialLink("GitHub", socialLinks.github, "fa-github")}
          {renderSocialLink("Twitter", socialLinks.twitter, "fa-twitter")}
          {renderSocialLink("Instagram", socialLinks.instagram, "fa-instagram")}
          {renderSocialLink("Facebook", socialLinks.facebook, "fa-facebook")}
          {renderSocialLink("Portfolio", socialLinks.portfolio, "fa-globe")}
        </div>
      </div>

      <div className="profile-action-buttons">
        <button className="button edit-profile-btn" onClick={() => navigate("/dashboard/update-profile")}>
          <i className="fas fa-edit"></i> Edit Profile
        </button>
        <button className="button delete-profile-btn" onClick={handleDeleteProfile}>
          <i className="fas fa-trash-alt"></i> Delete Profile
        </button>
      </div>
     
    </div>
     <Footer/>
    </>
  );
};

export default UserProfile;
