// controllers/activityController.js
import User from '../models/user.js'; // Adjust the import path as necessary

// Track User Activity with YouTube Links
export const trackActivity = async (req, res) => {
  const { userId, youtubeLink, timeSpent } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update activity log with YouTube link and time spent
    user.activityLog.push({ youtubeLink, timeSpent });

    // Add YouTube link to learning interests if not already present
    if (!user.learningInterests.includes(youtubeLink)) {
      user.learningInterests.push(youtubeLink);
    }

    // Save the user data after tracking the activity
    await user.save();
    res.status(200).json({ message: 'User activity with YouTube link tracked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
