import React, { useEffect, useState } from 'react';
import './Reviewlist.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer.jsx'; // Adjust the import path as necessary
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  // ✅ Safe user check from localStorage
  

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/review/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      toast.error('Failed to fetch reviews');
    }
  };

  

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
  <>
  
  <div className="review-list-wrapper">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All Course Reviews</h2>
      <ul className="review-list">
        {reviews.map((rev) => (
          <li className="review-card" key={rev._id}>
            <div className="review-header">
              <span className="reviewer-name">{rev.name}</span>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < rev.rating ? 'filled-star' : ''}>★</span>
                ))}
              </div>
            </div>
            <p className="review-text">{rev.review}</p>
            <div className="review-date">
              {new Date(rev.createdAt).toLocaleDateString()}
            </div>

           
          </li>
        ))}
      </ul>

      <ToastContainer position="top-center" autoClose={2000} />
    
    </div>
      <Footer/>
  </>
  );
};

export default ReviewList;
