import express from 'express';
import { protect } from '../middleware/Authmiddleware.js';
import { submitReview, deleteReview } from '../controllers/Reviewcontroller.js';

const router = express.Router();

// Submit Review
router.post('/submit-review', protect, submitReview);

// Delete Review
router.delete('/delete-review/:reviewId', protect, deleteReview);

export default router;
