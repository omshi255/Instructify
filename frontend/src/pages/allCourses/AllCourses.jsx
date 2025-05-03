import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllCourses.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer.jsx"; // Adjust the import path as necessary

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all courses from the backend
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "/api/courses/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response?.data || [];
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch courses");
      }

      setCourses(data.courses);
      setLoading(false);
    //   toast.success("Courses loaded!");
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error("Failed to fetch courses");
    }
  };

  // Toggle bookmark status for a course
  const toggleBookmark = async (courseId, isBookmarked) => {
    try {
      console.log("toggleBookmark ", courseId, isBookmarked);
      const token = localStorage.getItem("token");
      const endpoint = isBookmarked
        ? "/api/user/unbookmark"
        : "/api/user/bookmark";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to update bookmark");
      }

      setCourses(
        courses.map((course) =>
          course._id === courseId
            ? { ...course, isBookmarked: !isBookmarked }
            : course
        )
      );
      toast.success(
        isBookmarked ? "Course unbookmarked!" : "Course bookmarked!"
      );
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update bookmark");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      
      <div className="all-courses-container">
        <h1 className="all-courses-title">
          <FontAwesomeIcon icon={faBookmark} /> All Courses
        </h1>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : courses.length === 0 ? (
          <p className="no-courses">No courses available.</p>
        ) : (
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course._id} className="course-item">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="course-thumb"
                  />
                )}
                <h3>{course.title}</h3>
                <p>{course.description || "No description available."}</p>
                {course.category && (
                  <p>
                    <em>{course.category}</em>
                  </p>
                )}
                <div className="actions">
                  <button
                    className={`bookmark-btn ${
                      course.isBookmarked ? "bookmarked" : ""
                    }`}
                    onClick={() =>
                      toggleBookmark(course._id, course.isBookmarked)
                    }
                    aria-label={
                      course.isBookmarked
                        ? "Unbookmark course"
                        : "Bookmark course"
                    }
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
      <Footer/>

    </>
  );
};

export default AllCourses;
