import express from "express";
import {
  createCourse,
  getMyCourses,
  deleteCourse,
  updateCourse,
  getCoursesByUserId,
  getAllCourses,
} from "../controllers/courseController.js";
import { protect } from "../middleware/Authmiddleware.js";


const router = express.Router();

// router.post("/", protect, createCourse);
// router.get("/", protect, getMyCourses);
// router.put("/:id", protect, updateCourse); // 🆕 Edit route
// router.delete("/:id", protect, deleteCourse);
// router.get("/user/:userId", protect, getCoursesByUserId);
// router.get("/all", protect, getAllCourses);
router.post("/", protect, createCourse);
router.get("/all", protect, getAllCourses); // ⬅️ this should be before any `/:param`
router.get("/", protect, getMyCourses);
router.get("/user/:userId", protect, getCoursesByUserId);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

export default router;
