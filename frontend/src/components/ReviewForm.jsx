import React, { useState } from 'react';
import './Review.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState('');

  // Handle rating click
  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  // Submit review to backend
  const submitReview = async (e) => {
    e.preventDefault();

    if (!name || !rating || !review) {
      toast.error('Please fill in all fields');
      return;
    }

    // Collect review data
    const reviewData = {
      name,
      rating,
      review,
    };

    try {
      // Send review data to the backend
      const response = await fetch(
        "/api/review/submit-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token for authentication
          },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Review submitted successfully!');
        // Reset form fields
        setName('');
        setRating(null);
        setReview('');
      } else {
        toast.error(data.error || 'Failed to submit review');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the review');
    }
  };

  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${rating > i ? 'filled' : ''}`}
          onClick={() => handleRatingClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="course-review-wrapper">
        <h2 className="main-heading">Share Your Reviews</h2>
        <div className="content-grid">
          <div className="video-container">
            <video className="video-element" autoPlay loop muted playsInline>
              <source
                src="https://videos.pexels.com/video-files/7659719/7659719-uhd_1440_2560_25fps.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="form-container">
            <h3 className="review-heading">Provide Feedback</h3>
            <form onSubmit={submitReview} className="review-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating" className="form-label">Rate Us:</label>
                <div className="stars-container">{renderStars()}</div>
              </div>
              <div className="form-group">
                <label htmlFor="review" className="form-label">Review:</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write something"
                  className="form-textarea"
                  rows="2"
                  required
                />
              </div>
              <button type="submit" className="submit-button-review">Submit</button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default ReviewForm;
