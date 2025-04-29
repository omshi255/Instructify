// import React, { useState } from "react";
// import "./CourseGrid.css";

// const courses = [
//   {
//     title: "YouTube Success: Script, Shoot & Edit with MKBHD",
//     duration: "1h 13m",
//     students: "85,386",
//     instructor: "Marques Brownlee",
//     tag: "Featured",
//     thumbnail: "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMHN0YWNrfGVufDB8fDB8fHww"
//   },
//   {
//     title: "Music Fundamentals: Explore & Create Your Unique Sound",
//     duration: "1h 16m",
//     students: "8,720",
//     instructor: "Jacob Collier",
//     tag: "Music",
//     thumbnail: "https://cdn.prod.website-files.com/6344c9cef89d6f2270a38908/657270d7b0629b88ac5dbeb5_Common%20Technology%20Stack%20Layers.webp"
//   },
//   {
//     title: "Find Your Style: Five Exercises to Unlock Your Creative Identity",
//     duration: "1h 12m",
//     students: "68,795",
//     instructor: "Andy J. Pizza",
//     tag: "Creative Writing",
//     thumbnail: "https://images.ctfassets.net/4zfc07om50my/2oI5ahL8LV4ZZbDtE3dnGH/903729ef2d47e896044f9522b95d663d/Tech-Stack.jpg?w=2772&h=1580&fl=progressive&q=90&fm=jpg&bg=transparent"
//   },
//   {
//     title: "Video for Instagram: Tell an Engaging Story in Less Than a Minute",
//     duration: "27m",
//     students: "10,386",
//     instructor: "Hallease",
//     tag: "Social Media",
//     thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdIOlQbK9fH_Y2ibrEnpFssrEhy9RqBq6eyA&s"
//   },
//   {
//     title: "Organic Expressive Florals With Watercolor and Ink",
//     duration: "3h 29m",
//     students: "11,432",
//     instructor: "Ohn Mar Win",
//     tag: "Drawing & Painting",
//     thumbnail: "https://media.licdn.com/dms/image/v2/D5612AQEt2JaeIgtGOQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1695099748335?e=2147483647&v=beta&t=dr8VI39p67A0ska-B3Yi7y2K9lagM8y9dJIafEXaLNc"
//   },
//   {
//     title: "Productivity for Creators: Systems, Organization & Workflow",
//     duration: "1h 33m",
//     students: "34,229",
//     instructor: "Ali Abdaal",
//     tag: "Productivity",
//     thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBPXQyN9-1_VtWDIQReNh8dFwTZjkW2dZR0w&s"
//   },
//   {
//     title: "Procreate for Beginners: Learn the Basics & Sell Your Artwork",
//     duration: "1h 50m",
//     students: "61,121",
//     instructor: "Cat Coquillette",
//     tag: "Digital Illustration",
//     thumbnail: "https://ws.overcasthq.com/wp-content/uploads/2018/10/Cisco-Martech-Stack.jpg"
//   },
//   {
//     title: "Painting with Thread: Modern Embroidery for Beginners",
//     duration: "1h 29m",
//     students: "15,093",
//     instructor: "Danielle Clough",
//     tag: "Crafts",
//     thumbnail: "https://pearsonpartners.nl/wp-content/uploads/2022/01/tech-stack-1024x604.jpeg"
//   },
//   {
//     title: "Become a Better Blogger: Content Planning & Strategy",
//     duration: "2h 10m",
//     students: "19,582",
//     instructor: "Seth Godin",
//     tag: "Marketing",
//     thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWS3honh-bm1CW970vai3I_XTsDc9xWm08g&s"
//   },
//   {
//     title: "Mastering Logo Design: From Concept to Presentation",
//     duration: "1h 20m",
//     students: "22,750",
//     instructor: "Aaron Draplin",
//     tag: "Graphic Design",
//     thumbnail: "https://advesa.com/wp-content/uploads/2022/08/tech-stack.webp"
//   }
// ];

// export default function CourseGrid() {
//   const [selectedTag, setSelectedTag] = useState("All");

//   const tags = [
//     "All",
//     "Featured",
//     "Music",
//     "Drawing & Painting",
//     "Marketing",
//     "Animation",
//     "Social Media",
//     "UI/UX design",
//     "Creative Writing",
//     "Digital Illustration",
//     "Film & Video",
//     "Crafts",
//     "Freelance & Entrepreneurship",
//     "Graphic Design",
//     "Photography",
//     "Productivity"
//   ];

//   const filteredCourses =
//     selectedTag === "All"
//       ? courses
//       : courses.filter((course) => course.tag === selectedTag);

//   return (
//     <div className="course-grid">
//       <h1 className="title">Explore Inspiring Online Courses</h1>

//       <div className="filter-container">
//         {tags.map((tag) => (
//           <button
//             key={tag}
//             className={`filter-button ${selectedTag === tag ? "active" : ""}`}
//             onClick={() => setSelectedTag(tag)}
//           >
//             {tag}
//           </button>
//         ))}
//       </div>

//       <div className="grid-container">
//         {filteredCourses.map((course, index) => (
//           <div className="course-card" key={index}>
//             <img
//               src={course.thumbnail}
//               alt={course.title}
//               className="course-thumbnail"
//             />
//             <div className="card-content">
//               {course.tag && <span className="tag">{course.tag}</span>}
//               <h2 className="course-title">{course.title}</h2>
//               <div className="info">👥 <strong>{course.students}</strong> students</div>
//               <div className="info">⏱ {course.duration}</div>
//               <div className="info">👤 {course.instructor}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // This should be inside the component
import 'swiper/css'; // ✅ Core Swiper styles
import 'swiper/css/navigation'; // ✅ Only if using Navigation module
import 'swiper/css/pagination'; // ✅ Only if using Pagination
import 'swiper/css/autoplay'; // ✅ etc., as per your modules
import './CourseGrid.css'

const courses = [
  {
    title: "YouTube Success: Script, Shoot & Edit with MKBHD",
    duration: "1h 13m",
    students: "85,386",
    instructor: "Marques Brownlee",
    tag: "Featured",
    thumbnail: "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760"
  },
  {
    title: "Music Fundamentals: Explore & Create Your Unique Sound",
    duration: "1h 16m",
    students: "8,720",
    instructor: "Jacob Collier",
    tag: "Music",
    thumbnail: "https://img.freepik.com/free-vector/gradient-halftone-technology-youtube-thumbnail_23-2149164508.jpg"
  },
  {
    title: "Digital Marketing: Strategies for Online Success",
    duration: "1h 22m",
    students: "15,103",
    instructor: "Neil Patel",
    tag: "Marketing",
    thumbnail: "https://promoalltest-blog.cdnpromo.com/wp-content/uploads/2021/11/OG-YouTube-Thumbnail-size-and-best-practices-scaled.jpg"
  },
  {
    title: "Drawing & Painting: From Beginner to Master",
    duration: "2h 05m",
    students: "5,104",
    instructor: "Bobby Chiu",
    tag: "Art",
    thumbnail: "https://img.freepik.com/free-vector/gradient-abstract-fluid-technology-youtube-thumbnail_23-2149037571.jpg"
  },
  {
    title: "UI/UX Design: Principles and Practices",
    duration: "1h 30m",
    students: "25,899",
    instructor: "Julie Zhuo",
    tag: "Design",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHvKnwO4o06B7MgtgP-k4CUz24xy-5siK7dw&s"
  }, {
    title: "YouTube Success: Script, Shoot & Edit with MKBHD",
    duration: "1h 13m",
    students: "85,386",
    instructor: "Marques Brownlee",
    tag: "Featured",
    thumbnail: "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760"
  },
  {
    title: "Music Fundamentals: Explore & Create Your Unique Sound",
    duration: "1h 16m",
    students: "8,720",
    instructor: "Jacob Collier",
    tag: "Music",
    thumbnail: "https://img.freepik.com/free-vector/gradient-halftone-technology-youtube-thumbnail_23-2149164508.jpg"
  },
  {
    title: "Digital Marketing: Strategies for Online Success",
    duration: "1h 22m",
    students: "15,103",
    instructor: "Neil Patel",
    tag: "Marketing",
    thumbnail: "https://promoalltest-blog.cdnpromo.com/wp-content/uploads/2021/11/OG-YouTube-Thumbnail-size-and-best-practices-scaled.jpg"
  },
  {
    title: "Drawing & Painting: From Beginner to Master",
    duration: "2h 05m",
    students: "5,104",
    instructor: "Bobby Chiu",
    tag: "Art",
    thumbnail: "https://img.freepik.com/free-vector/gradient-abstract-fluid-technology-youtube-thumbnail_23-2149037571.jpg"
  },
  {
    title: "UI/UX Design: Principles and Practices",
    duration: "1h 30m",
    students: "25,899",
    instructor: "Julie Zhuo",
    tag: "Design",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHvKnwO4o06B7MgtgP-k4CUz24xy-5siK7dw&s"
  }
];

export default function CourseGrid() {
  const navigate = useNavigate();  // Move the hook here inside the component

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
          1024: { slidesPerView: 3 }
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
                <div className="info">👥 <strong>{course.students}</strong> students</div>
                <div className="info">⏱ {course.duration}</div>
                <div className="info">👤 {course.instructor}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
     <div className="btn-see-more">
     <button 
  onClick={handleSeeMore} 
  className="see-more-btn"
>
<i className="fas fa-arrow-right"></i> 
</button>
     </div>

    </div>
  );
}
