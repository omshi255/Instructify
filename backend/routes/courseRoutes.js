import express from "express";
import {
  createCourse,
  getMyCourses,
  deleteCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/Authmiddleware.js";


const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", protect, getMyCourses);
router.put("/:id", protect, updateCourse); // 🆕 Edit route
router.delete("/:id", protect, deleteCourse);

export default router;
