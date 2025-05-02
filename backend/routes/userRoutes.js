import express from "express";

import { protect } from "../middleware/Authmiddleware.js";
import {
 
  bookmarkCourse,
  unbookmarkCourse,
  getBookmarkedCourses,
} from "../controllers/usercontrollers.js";

const router = express.Router();



// Protected routes for bookmark operations
router.post("/bookmark", protect, bookmarkCourse);
router.post("/unbookmark", protect, unbookmarkCourse);
router.get("/bookmarks", protect, getBookmarkedCourses);



export default router;
