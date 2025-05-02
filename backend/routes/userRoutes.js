import express from "express";
import User from "../models/user.js";
import { protect } from "../middleware/Authmiddleware.js";
import {
  addLearningInterest,
  removeLearningInterest,
  getLearningInterests,
  bookmarkCourse,
  unbookmarkCourse,
  getBookmarkedCourses,
} from "../controllers/usercontrollers.js";

const router = express.Router();

// Fetch learning interests of a user
router.get("/learning-interests/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ learningInterests: user.learningInterests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add or update learning interests
router.put("/learning-interests/:userId", async (req, res) => {
  const { userId } = req.params;
  const { interest, interests } = req.body;

  if (!interest && (!interests || interests.length === 0)) {
    return res.status(400).json({ message: "Interest(s) are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (interest && !user.learningInterests.includes(interest)) {
      user.learningInterests.push(interest);
    }

    if (interests) {
      interests.forEach((i) => {
        if (i && !user.learningInterests.includes(i)) {
          user.learningInterests.push(i);
        }
      });
    }

    await user.save();

    res.json({
      message: "Learning interest(s) added successfully",
      learningInterests: user.learningInterests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new activity log
router.post("/:userId/activity", async (req, res) => {
  const { userId } = req.params;
  const { courseId, topic, category, youtubeLink, timeSpent } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.activityLog.push({
      courseId,
      topic,
      category,
      youtubeLink,
      timeSpent,
    });
    await user.save();

    res.json({
      message: "Activity logged successfully",
      activityLog: user.activityLog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Protected routes for bookmark operations
router.post("/bookmark", protect, bookmarkCourse);
router.post("/unbookmark", protect, unbookmarkCourse);
router.get("/bookmarks", protect, getBookmarkedCourses);

// Protected routes for learning interests
router.post("/learning-interests", protect, addLearningInterest);
router.delete("/learning-interests", protect, removeLearningInterest);
router.get("/learning-interests", protect, getLearningInterests);

export default router;
