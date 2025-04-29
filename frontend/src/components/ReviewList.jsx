// src/components/ReviewList.js
import React from 'react';
import axios from 'axios';

const ReviewList = ({ reviews }) => {
  const [authToken] = React.useState('YOUR_AUTH_TOKEN'); // Replace with your JWT token

  // Delete a review
  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/review/delete-review/${reviewId}`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      alert('Review deleted successfully!');
      // Here, you'd call fetchReviews to refresh reviews if necessary
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  return (
    <div className="reviews-list">
      <h2>Existing Reviews</h2>
      {reviews.map((rev) => (
        <div className="review-item" key={rev._id}>
          <strong>{rev.name}</strong> (Rating: {rev.rating})
          <p>{rev.review}</p>
          <button onClick={() => deleteReview(rev._id)}>Delete Review</button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
