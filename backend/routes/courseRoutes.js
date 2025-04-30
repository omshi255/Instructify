import express from "express";
import {
  createCourse,
  getMyCourses,
  deleteCourse,
  updateCourse,
  getCoursesByUserId,
} from "../controllers/courseController.js";
import { protect } from "../middleware/Authmiddleware.js";
import Course from "../models/Course.js"; // Assuming you have a Course model defined


const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", protect, getMyCourses);
router.put("/:id", protect, updateCourse); // 🆕 Edit route
router.delete("/:id", protect, deleteCourse);
router.get("/user/:userId", protect, getCoursesByUserId);

export default router;
