import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CourseForm from "./CourseForm";
import "./MyCourses.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer.jsx";

import {
  faPenToSquare,
  faTrash,
  faChevronDown,
  faChevronUp,
  faBookOpen,
  faFilePdf,
  faVideo,
  faImage,
} from "@fortawesome/free-solid-svg-icons";




const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.courses);
      // toast.success("Courses loaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course deleted!");
      fetchCourses();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const toggleLessons = (id) => {
    setExpandedCourseId((prevId) => (prevId === id ? null : id));
  };

  return (
   <>
   
    <div className="my-courses-container">
      <div className="left-section">
      

        <CourseForm
          fetchCourses={fetchCourses}
          editCourse={editCourse}
          setEditCourse={setEditCourse}
        />
        <h3 className="my-courses-title">
          <FontAwesomeIcon icon={faBookOpen} /> My Courses
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <ul className="course-list">
            {courses.map((course) => (
              <li
                key={course._id}
                className={`course-item ${
                  editCourse && editCourse._id === course._id ? "editing" : ""
                }`}
              >
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="course-thumb"
                  />
                )}
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>
                  <strong>₹{course.price || "Free"}</strong>
                </p>
                <p>
                  <em>{course.category}</em>
                </p>

                {course.lessons?.length > 0 && (
                  <button
                    className="toggle-lessons-btn"
                    onClick={() => toggleLessons(course._id)}
                  >
                    {expandedCourseId === course._id ? (
                      <>
                        <FontAwesomeIcon icon={faChevronUp} /> Hide Lessons
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faChevronDown} /> Show Lessons
                      </>
                    )}
                  </button>
                )}

                {expandedCourseId === course._id && course.lessons.length > 0 && (
                  <div className="lessons">
                    <ul>
                      {course.lessons.map((lesson, index) => (
                        <li key={index} className="lesson-card">
                          <strong>{lesson.title}</strong>
                          {lesson.content && <p>{lesson.content}</p>}

                          {lesson.videoUrl && (
                            <p>
                              <FontAwesomeIcon icon={faVideo} />{" "}
                              <a
                                href={lesson.videoUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Watch Video
                              </a>
                            </p>
                          )}

                          {lesson.pdfUrl && (
                            <p>
                              <FontAwesomeIcon icon={faFilePdf} />{" "}
                              <a
                                href={lesson.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Download PDF
                              </a>
                            </p>
                          )}

                          {lesson.imageUrl && (
                            <p>
                              <FontAwesomeIcon icon={faImage} />{" "}
                              <a
                                href={lesson.imageUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View Image
                              </a>
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="actions">
                  <button className="editbtn" onClick={() => setEditCourse(course)}>
                    <FontAwesomeIcon icon={faPenToSquare} /> 
                  </button>
                  <button className="deletebtn" onClick={() => handleDelete(course._id)}>
                    <FontAwesomeIcon icon={faTrash} /> 
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

  

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
    <Footer/>
   </>
  );
};

export default MyCourses;
