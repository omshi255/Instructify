// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Reviewlist.css'; // use your custom styles

// const ReviewList = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all reviews on mount
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:5000/api/review/reviews');
//         setReviews(data);
//       } catch (error) {
//         console.error('Failed to fetch reviews', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, index) => (
//       <span key={index} className={index < rating ? 'filled-star' : ''}>★</span>
//     ));
//   };

//   return (
//     <div className="review-list-wrapper">
//       <h2 className="main-heading">What Users Say</h2>

//       {loading ? (
//         <p>Loading reviews...</p>
//       ) : reviews.length === 0 ? (
//         <p>No reviews yet.</p>
//       ) : (
//         <ul className="review-list">
//           {reviews.map((review) => (
//             <li key={review._id} className="review-card">
//               <div className="review-header">
//                 <h4 className="reviewer-name">{review.name}</h4>
//                 <div className="review-stars">{renderStars(review.rating)}</div>
//               </div>
//               <p className="review-text">{review.review}</p>
//               <small className="review-date">
//                 {new Date(review.createdAt).toLocaleDateString()}
//               </small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ReviewList;
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
      const res = await fetch('http://localhost:5000/api/review/reviews');
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
