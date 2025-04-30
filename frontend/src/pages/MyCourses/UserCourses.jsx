// CourseList.js
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './UserCourses.css';
import Footer from '../../components/Footer.jsx'; // Adjust the import path as necessary
const CourseList = () => {
  const { userId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data.courses);
       
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError('Error fetching courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  if (loading) return <div className="course-list-loading">Loading...</div>;
  if (error) return <div className="course-list-error">{error}</div>;

  return (
    <div className="course-list-container">
      <h2 className="course-list-title"><i class="fas fa-book"></i>  User Courses</h2>
      {courses.length > 0 ? (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course._id} className="course-item">
              <div className="course-header">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <p className="course-category"><strong>Category:</strong> {course.category}</p>
                {course.thumbnail && <img className="course-thumbnail" src={course.thumbnail} alt={course.title} />}
              </div>
              <ul className="lesson-list">
                {course.lessons.map((lesson, index) => (
                  <li key={index} className="lesson-item">
                    <h4 className="lesson-title">{lesson.title}</h4>
                    <p className="lesson-content">{lesson.content}</p>
                    {lesson.videoUrl && (
                      <a className="lesson-link" href={lesson.videoUrl} target="_blank" rel="noopener noreferrer"> <i class="fas fa-video"></i> Watch Video</a>
                    )}
                    {lesson.pdfUrl && (
                      <a className="lesson-link" href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer">    <i class="fas fa-file-pdf"></i> Download PDF</a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-courses">No courses found</p>
      )}
        <Footer/>
    </div>

  );
};

export default CourseList;
