import React from "react";
import "./Hero.css";
import Lottie from "react-lottie";
import animationData from "../animations/Animation - 1745147608101.json";
import whyChooseUsAnimation from '../animations/Animation - 1745926929618.json'; // Update path as per your file structure
import Navbar from "../pages/DashboardNavbar";
import Recommendations from '../components/Recommendations.jsx';
// import Footer from './Footer.jsx';
import ReviewForm from "./ReviewForm.jsx";
import Footer from '../components/Footer.jsx' // Import the Footer component

const HeroSection = () => {
  // Default options for the first Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  // Default options for the second Lottie animation (Why Choose Us section)
  const whyChooseUsOptions = {
    loop: true,
    autoplay: true,
    animationData: whyChooseUsAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-text">
          <p className="tagline animated-text">Start your favourite course<span className="emoji">🎓</span></p>
          <h1 className="animated-heading">
            {["Now", "learning", "from", "anywhere,"].map((word, i) => (
              <span key={i} className="word" style={{ animationDelay: `${i * 0.2}s` }}>
                {word}&nbsp;
              </span>
            ))}
            <br />
            {["and", "build", "your"].map((word, i) => (
              <span key={i + 4} className="word" style={{ animationDelay: `${(i + 4) * 0.2}s` }}>
                {word}&nbsp;
              </span>
            ))}
            <span className="highlight word" style={{ animationDelay: "1.6s" }}>bright career.</span>
          </h1>

          <p className="subtext">
            {["It", "has", "survived", "not", "only", "five", "centuries", "but", "also", "the", "leap", "into", "electronic", "typesetting."].map((word, i) => (
              <span key={i} className="word" style={{ animationDelay: `${i * 0.15}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </p>

          <div className="button-get-started">
            <button className="cssbuttons-io-button">
              Get started
              <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="hero-image">
          <video autoPlay loop muted playsInline className="hero-video-triangle">
            <source src="https://videos.pexels.com/video-files/7989443/7989443-hd_1920_1080_25fps.mp4" />
          </video>

          <video autoPlay loop muted playsInline className="hero-video-circle">
            <source src="https://videos.pexels.com/video-files/6985519/6985519-uhd_2560_1440_25fps.mp4" />
          </video>

          <div className="lottie-container" style={{ width: "500px", height: "500px" }}>
            <Lottie options={defaultOptions} height={400} width={400} style={{ position: "absolute", top: "-50px", right: "20px" }} />
          </div>
        </div>
      </section>

      
      
     

      <section className="icon-section">
        <div className="icon-card">
          <i className="fas fa-users fa-3x"></i>
          <h3>5,000+ Students Enrolled</h3>
          <p>Our platform has helped over 5,000 students achieve their career goals!</p>
        </div>
        <div className="icon-card">
          <i className="fas fa-chalkboard-teacher fa-3x"></i>
          <h3>120+ Courses Available</h3>
          <p>Explore a wide range of courses to boost your skills and knowledge.</p>
        </div>
        <div className="icon-card">
          <i className="fas fa-check-circle fa-3x"></i>
          <h3>95% Completion Rate</h3>
          <p>Our students have a high success rate, thanks to our effective courses.</p>
        </div>
        <div className="icon-card">
          <i className="fas fa-laptop-code fa-3x"></i>
          <h3>Interactive Learning</h3>
          <p>Hands-on coding and practice sessions for real-world experience.</p>
        </div>
      </section>
      <Recommendations />
      <section className="why-choose-us">
        <div className="why-left">
        <h2 className="heading-2-instructify">
  <i className="fas fa-check-circle"></i> Why Choose Instructify?
</h2>

          <ul>
            <li>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Interactive Courses</h4>
                <p>Hands-on learning for deep understanding of concepts.</p>
              </div>
            </li>
            <li>
              <i className="fas fa-graduation-cap"></i>
              <div>
                <h4>Personalized Learning</h4>
                <p>Tailored content based on your learning progress.</p>
              </div>
            </li>
            <li>
              <i className="fas fa-lightbulb"></i>
              <div>
                <h4>Innovative Techniques</h4>
                <p>We use modern tools to keep learning effective and fun.</p>
              </div>
            </li>
            <li>
              <i className="fas fa-comment-dots"></i>
              <div>
                <h4>Live Feedback</h4>
                <p>Real-time feedback to help you improve consistently.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="why-right">
          <Lottie options={whyChooseUsOptions} height={300} width={300} />
        </div>
      </section>
      <section className="review-form-section">
        <ReviewForm /> {/* Add the ReviewForm component here */}
      </section>
      {/* <Footer /> */}

      <section className="features-section">
        <div className="feature-card">
          <i className="fas fa-user-graduate feature-icon"></i>
          <p className="feature-text">Expert Instructors</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-certificate feature-icon"></i>
          <p className="feature-text">Badges At Each Step</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-clock feature-icon"></i>
          <p className="feature-text">Learn at Your Own Pace</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-mobile-alt feature-icon"></i>
          <p className="feature-text">Mobile & Web Friendly</p>
        </div>
      </section>
     <Footer/>
    </>
  );
};

export default HeroSection;
