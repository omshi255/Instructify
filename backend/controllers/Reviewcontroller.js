import Review from '../models/Review.js';


export const submitReview = async (req, res) => {
  const { rating, review, name } = req.body;
  const userId = req.user._id; // Assuming req.user contains the authenticated user's info

  try {
    const newReview = new Review({
      userId,
      name,
      rating,
      review,
    });

    await newReview.save();
    res.status(200).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to submit review' });
  }
};


// Delete Review
export const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user._id; // Assuming req.user contains the authenticated user's info

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You can only delete your own reviews' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};