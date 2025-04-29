import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/Animation - 1745779336215.json"; // Path to your Lottie spinner JSON file

const Spinner = () => {
  const defaultOptions = {
    loop: true, // Will loop the animation
    autoplay: true, // Autoplay animation
    animationData: animationData, // Lottie JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Adjust the aspect ratio
    },
  };

  return <Lottie options={defaultOptions} height={100} width={100} />;
};

export default Spinner;
