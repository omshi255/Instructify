import React from "react";
import "./Hero.css";
import Lottie from "react-lottie";
import animationData from "../animations/Animation - 1745147608101.json"; // Update path as per your file structure

const HeroSection = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Import your Lottie animation file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
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
  {[
    "It", "has", "survived", "not", "only", "five", "centuries", "but",
    "also", "the", "leap", "into", "electronic", "typesetting."
  ].map((word, i) => (
    <span key={i} className="word" style={{ animationDelay: `${i * 0.15}s` }}>
      {word}&nbsp;
    </span>
  ))}
</p>


<div className="button-get-started">
<button class="cssbuttons-io-button">
  Get started
  <div class="icon">
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</button>
</div>
</div>


      <div className="hero-image">
        {/* Triangle Video */}
        <video autoPlay loop muted playsInline className="hero-video-triangle">
          <source src="https://videos.pexels.com/video-files/7989443/7989443-hd_1920_1080_25fps.mp4" />
        </video>

        {/* Circle Video */}
        <video autoPlay loop muted playsInline className="hero-video-circle">
          <source src="https://videos.pexels.com/video-files/6985520/6985520-uhd_2560_1440_25fps.mp4" />
        </video>

        {/* Lottie Animation */}
        <div className="lottie-container" style={{width: "500px", height: "500px"}}>
          <Lottie options={defaultOptions} height={400} width={400} style={{position : "absolute" , top:"-50px" , right:"20px"}} />
        </div>

       
      </div>
    </section>
  );
};

export default HeroSection;
