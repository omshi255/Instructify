import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // This should be inside the component
import "swiper/css"; // ✅ Core Swiper styles
import "swiper/css/navigation"; // ✅ Only if using Navigation module
import "swiper/css/pagination"; // ✅ Only if using Pagination
import "swiper/css/autoplay"; // ✅ etc., as per your modules
import "./CourseGrid.css";

const courses = [
  {
    title: "YouTube Success: Script, Shoot & Edit with MKBHD",
    duration: "1h 13m",
    students: "85,386",
    instructor: "Marques Brownlee",
    tag: "Featured",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760",
  },
  {
    title: "Music Fundamentals: Explore & Create Your Unique Sound",
    duration: "1h 16m",
    students: "8,720",
    instructor: "Jacob Collier",
    tag: "Music",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-halftone-technology-youtube-thumbnail_23-2149164508.jpg",
  },
  {
    title: "Digital Marketing: Strategies for Online Success",
    duration: "1h 22m",
    students: "15,103",
    instructor: "Neil Patel",
    tag: "Marketing",
    thumbnail:
      "https://promoalltest-blog.cdnpromo.com/wp-content/uploads/2021/11/OG-YouTube-Thumbnail-size-and-best-practices-scaled.jpg",
  },
  {
    title: "Drawing & Painting: From Beginner to Master",
    duration: "2h 05m",
    students: "5,104",
    instructor: "Bobby Chiu",
    tag: "Art",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-abstract-fluid-technology-youtube-thumbnail_23-2149037571.jpg",
  },
  {
    title: "UI/UX Design: Principles and Practices",
    duration: "1h 30m",
    students: "25,899",
    instructor: "Julie Zhuo",
    tag: "Design",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHvKnwO4o06B7MgtgP-k4CUz24xy-5siK7dw&s",
  },
  {
    title: "YouTube Success: Script, Shoot & Edit with MKBHD",
    duration: "1h 13m",
    students: "85,386",
    instructor: "Marques Brownlee",
    tag: "Featured",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760",
  },
  {
    title: "Music Fundamentals: Explore & Create Your Unique Sound",
    duration: "1h 16m",
    students: "8,720",
    instructor: "Jacob Collier",
    tag: "Music",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-halftone-technology-youtube-thumbnail_23-2149164508.jpg",
  },
  {
    title: "Digital Marketing: Strategies for Online Success",
    duration: "1h 22m",
    students: "15,103",
    instructor: "Neil Patel",
    tag: "Marketing",
    thumbnail:
      "https://promoalltest-blog.cdnpromo.com/wp-content/uploads/2021/11/OG-YouTube-Thumbnail-size-and-best-practices-scaled.jpg",
  },
  {
    title: "Drawing & Painting: From Beginner to Master",
    duration: "2h 05m",
    students: "5,104",
    instructor: "Bobby Chiu",
    tag: "Art",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-abstract-fluid-technology-youtube-thumbnail_23-2149037571.jpg",
  },
  {
    title: "UI/UX Design: Principles and Practices",
    duration: "1h 30m",
    students: "25,899",
    instructor: "Julie Zhuo",
    tag: "Design",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHvKnwO4o06B7MgtgP-k4CUz24xy-5siK7dw&s",
  },
];

export default function CourseGrid() {
  const navigate = useNavigate(); // Move the hook here inside the component

  const handleSeeMore = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="course-grid">
      <h1 className="title-course">
        <i className="fas fa-book-open course-icon"></i>
        Explore Inspiring Online Courses
      </h1>

      <Swiper
        className="my-course-slider"
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="course-card-home">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="course-thumbnail-hero"
              />
              <div className="card-content">
                <span className="tag">{course.tag}</span>
                <h2 className="course-title">{course.title}</h2>
                <div className="info">
                  👥 <strong>{course.students}</strong> students
                </div>
                <div className="info">⏱ {course.duration}</div>
                <div className="info">👤 {course.instructor}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="btn-see-more">
        <button onClick={handleSeeMore} className="see-more-btn">
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
