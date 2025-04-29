// routes/userRoutes.js
import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Fetch learning interests of a user
router.get('/:userId/learning-interests', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ learningInterests: user.learningInterests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// routes/authRoutes.js
router.put('/:userId/learning-interests', async (req, res) => {
    const { userId } = req.params;
    const { interest, interests } = req.body;
  
    // Validate if the input is correct
    if (!interest && (!interests || interests.length === 0)) {
      return res.status(400).json({ message: 'Interest(s) are required' });
    }
  
    try {
      // Fetch the user based on userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If a single interest is passed
      if (interest) {
        if (interest && !user.learningInterests.includes(interest)) {
          user.learningInterests.push(interest);
        }
      }
  
      // If an array of interests is passed
      if (interests) {
        interests.forEach((i) => {
          if (i && !user.learningInterests.includes(i)) {
            user.learningInterests.push(i);
          }
        });
      }
  
      // Save the updated user document
      await user.save();
  
      // Send success response
      res.json({
        message: 'Learning interest(s) added successfully',
        learningInterests: user.learningInterests,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  

// Add a new activity log (e.g., YouTube link visit or course interaction)
router.post('/:userId/activity', async (req, res) => {
  const { userId } = req.params;
  const { courseId, topic, category, youtubeLink, timeSpent } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add new activity to the activity log
    user.activityLog.push({ courseId, topic, category, youtubeLink, timeSpent });
    await user.save();

    res.json({ message: 'Activity logged successfully', activityLog: user.activityLog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
