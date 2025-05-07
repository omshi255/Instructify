import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faChevronRight,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false); // Added loadingUser state
  const [username, setUsername] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [learningInterests, setLearningInterests] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCourses = useCallback(async () => {
    try {
      setLoadingCourses(true);
      const res = await axios.get("/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.courses || []);
      const bookmarkCourseRes = await axios.get(
        "/api/user/bookmarks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookmarkedCourses(bookmarkCourseRes.data.courses || []);
      console.log("bookmark course ", bookmarkCourseRes);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Failed to fetch courses";
      toast.error(errorMessage);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoadingCourses(false);
    }
  }, [token, navigate]);

  const fetchSkills = useCallback(async () => {
    try {
      setLoadingSkills(true);
      const res = await axios.get("/api/teachingskills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data.skills || []);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Failed to fetch skills";
      toast.error(errorMessage);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoadingSkills(false);
    }
  }, [token, navigate]);

  const fetchUserNameAndProfilePic = useCallback(async () => {
    try {
      setLoadingUser(true);
      const res = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data.user;

      setUsername(user.name || "");
      setUserProfilePic(user.profilePic || "");
      setBio(user.bio || "");
      setDescription(user.description || "");
      setCreatedAt(
        user.createdAt ? new Date(user.createdAt).toLocaleString() : ""
      );
      setUpdatedAt(
        user.updatedAt ? new Date(user.updatedAt).toLocaleString() : ""
      );
      setLearningInterests(
        Array.isArray(user.learningInterests) ? user.learningInterests : []
      );

      const fields = [
        user.name,
        user.profilePic,
        user.bio,
        user.description,
        user.learningInterests,
      ];
      const filledFields = fields.filter((field) => {
        if (Array.isArray(field)) return field.length > 0;
        return field !== null && field !== undefined && field !== "";
      });
      const profileCompletionPercentage =
        (filledFields.length / fields.length) * 100;
      setProfileCompletion(profileCompletionPercentage);
    } catch (error) {
      console.error("Failed to fetch user", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user data";
      toast.error(errorMessage);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoadingUser(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCourses();
    fetchSkills();
    fetchUserNameAndProfilePic();
  }, [fetchCourses, fetchSkills, fetchUserNameAndProfilePic, token, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course deleted!");
      fetchCourses();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete";
      toast.error(errorMessage);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // const handleDeleteProfile = async () => {
  //   try {
  //     await axios.delete("/api/auth/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     toast.success("Profile deleted!");
  //     localStorage.removeItem("token");
  //     navigate("/login");
  //   } catch (err) {
  //     const errorMessage =
  //       err.response?.data?.message || "Failed to delete profile";
  //     toast.error(errorMessage);
  //     if (err.response?.status === 401) {
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //     }
  //   }
  // };

  const dashboardLinks = [
    { to: "/dashboard/profile", label: "My Profile", isProfile: true },
    { to: "/dashboard/mycourses", label: "My Courses", isCourses: true },
    {
      to: "/dashboard/teaching-skills",
      label: "Teaching Skills",
      isSkills: true,
    },
    { to: "/dashboard/interests", label: "Interests" },
    { to: "/dashboard/progress", label: "Progress" },
    { to: "/dashboard/bookmarked", label: "Bookmarked Courses" },
  ];

  const progressData = [
    { hour: "00:00", videosWatched: 0 },
    { hour: "04:00", videosWatched: 1 },
    { hour: "08:00", videosWatched: 2 },
    { hour: "12:00", videosWatched: 3 },
    { hour: "16:00", videosWatched: 2 },
    { hour: "20:00", videosWatched: 1 },
    { hour: "24:00", videosWatched: 2 },
  ];

  const totalVideosWatched = progressData.reduce(
    (acc, cur) => acc + cur.videosWatched,
    0
  );

  if (loadingCourses || loadingSkills || loadingUser) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  return (
    <>
    <div className="dashboradMainBox">
      <h3 className="dashboard-heading">
        Hii {username ? username : "User"}!<span className="emoji">👋</span>
      </h3>
      <div className="dashboard-grid-9">
        {dashboardLinks.slice(0, 9).map((link, index) => (
          <div key={index} className="dashboard-box">
            <span className="icon-tilt">{link.icon}</span>

            {/* Courses Section */}
            {link.isCourses && (
              <div className="courses-section-inside">
                <h3 className="course-heading-detail">
                  <FontAwesomeIcon icon={faLaptop} /> My Courses
                </h3>
                {courses.length === 0 ? (
                  <p>No courses available.</p>
                ) : (
                  <ul className="courses-list">
                    {courses.map((course) => (
                      <li key={course._id} className="course-card">
                        <div className="course-header">
                          {course.thumbnail && (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="course-thumbnail"
                            />
                          )}
                          <div className="course-details">
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-description">
                              {course.description}
                            </p>
                            <p className="course-price">
                              <strong>₹{course.price || "Free"}</strong>
                            </p>
                            <p className="course-category">
                              <em>{course.category}</em>
                            </p>
                          </div>
                          <div className="course-buttons">
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(course._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              className="btn-toggle-lessons"
                              onClick={() =>
                                navigate(`/dashboard/mycourse/${course._id}`)
                              }
                            >
                              <FontAwesomeIcon icon={faChevronRight} /> View
                              Course
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Profile Completion Section */}
            {index === 3 && (
              <div className="profile-completion-section">
                <h3 className="head-circle">
                  {" "}
                  <i className="fas fa-bullseye"></i> Profile Completion Ratio
                </h3>

                {/* Half Circle Progress */}
                <div className="half-circle-wrapper">
                  <div className="half-circle-base"></div>
                  <div
                    className="half-circle-fill"
                    style={{
                      transform: `scaleY(${profileCompletion / 100})`, // Using scaleY for gradual filling
                    }}
                  ></div>
                </div>

                {/* Profile Completion Text */}
                <p>{profileCompletion}% Completed</p>

                {/* Marks Details */}
                <div className="marks-distribution">
                  <h4>Marks Distribution:</h4>
                  <ul>
                    <li>
                      Bio: 25 Marks (You got: {bio ? "Filled" : "Not Filled"})
                    </li>
                    <li>
                      Description: 25 Marks (You got:{" "}
                      {description ? "Filled" : "Not Filled"})
                    </li>
                    <li>
                      Profile Picture: 25 Marks (You got:{" "}
                      {userProfilePic ? "Filled" : "Not Filled"})
                    </li>
                    <li>
                      Learning Interests: 25 Marks (You got:{" "}
                      {learningInterests.length > 0 ? "Filled" : "Not Filled"})
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Teaching Skills Section */}
            {link.isSkills && (
              <div className="teaching-skills-list-container">
                <h3 className="teachingskills-heading-h3">
                  {" "}
                  <i className="fas fa-chalkboard-teacher"></i> Teaching
                  Intrests (Max 15)
                </h3>
                {loadingSkills ? (
                  <p>Loading Skills...</p>
                ) : skills.length === 0 ? (
                  <p>No skills available.</p>
                ) : (
                  <ul className="teaching-skills-list">
                    {skills.map((skill, idx) => {
                      const percentage = Math.floor(Math.random() * 41) + 60; // Random 60-100
                      return (
                        <li key={idx} className="teaching-skill-item">
                          <div className="skill-name">{skill}</div>
                          <div className="skill-percentage-line">
                            <span className="percentage-text">
                              {percentage}%
                            </span>
                            <div
                              className="underline"
                              style={{
                                width: `${percentage}%`,
                                "--final-width": `${percentage}%`,
                              }}
                            ></div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}

            {/* Profile Section */}
            {link.isProfile && (
              <div className="profile-card">
                <h3 className="profile-heading-user">
                  <i className="fas fa-user-check"></i>Profile Section
                </h3>
                <div className="profile-header">
                  <img
                    src={userProfilePic}
                    alt="Profile"
                    className="profile-img"
                  />
                  <h2 className="username">{username}</h2>
                </div>
                <p className="para">
                  <strong className="heading">Bio:</strong>{" "}
                  {bio || "No bio available"}
                </p>
                <p className="para">
                  <strong className="heading">Description:</strong>{" "}
                  {description || "No description available"}
                </p>
                <p className="para">
                  <strong className="heading">Created At:</strong> {createdAt}
                </p>
                <p className="para">
                  <strong className="heading">Updated At:</strong> {updatedAt}
                </p>

                <div className="learning-interests">
                  <strong>Learning Interests:</strong>
                  <ul>
                    {learningInterests.length > 0 ? (
                      learningInterests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                      ))
                    ) : (
                      <li>No learning interests listed</li>
                    )}
                  </ul>
                </div>
                {/* <div className="profile-actions">
                  <button className="btn update-btn" onClick={() => navigate('/dashboard/update-profile')}> <i className="fas fa-edit"></i>Edit Profile</button>
                  <button className="btn delete-btn" onClick={handleDeleteProfile}>
  <i className="fas fa-trash-alt"></i>Delete Profile
</button>

                </div> */}
              </div>
            )}

            {link.label === "Progress" && (
              <div className="progress-graph-section">
                <h3 className="graph-heading">
                  {" "}
                  <i className="fas fa-chart-line"></i>Learning Progress
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={progressData}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="hour" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="videosWatched"
                      stroke="#4caf50"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="progress-message">
                  Today you completed {totalVideosWatched} videos — Excellent
                  work!
                </div>
              </div>
            )}
            {/* bookmarked courses section */}
            {link.label === "Bookmarked Courses" && (
              <div className="bookmarked-section">
                <h3 className="bookmarked-heading">
                  <i className="fas fa-bookmark"></i> My Bookmarked Courses
                </h3>

                {loadingCourses ? (
                  <p>Loading Courses...</p>
                ) : bookmarkedCourses.length === 0 ? (
                  <p>No courses available.</p>
                ) : (
                  <ul className="bookmarked-list">
                    {bookmarkedCourses.map((course) => (
                      <li key={course._id} className="bookmarked-item">
                        {course.thumbnail && (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="bookmarked-thumbnail"
                          />
                        )}
                        <div className="bookmarked-info">
                          <h4 className="bookmarked-title">{course.title}</h4>
                          <p className="bookmarked-description">
                            {course.description}
                          </p>
                          <div className="bookmarked-meta">
                            <span className="bookmarked-price">
                              ₹{course.price || "Free"}
                            </span>
                            <span className="bookmarked-category">
                              {course.category}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
      <Footer />
    </div>
    </>
  );
};

export default MyCourses;
