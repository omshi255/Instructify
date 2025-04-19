// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser  } from '../controllers/usercontrollers.js';
import { protect } from '../middleware/Authmiddleware.js'; // Import the protect middleware
import { upload } from "../middleware/multerConfig.js";
// import upload from '../config/multer.js'; // Import the multer configuration

const router = express.Router();
router.post('/register', upload.single('profilePic'), registerUser);

// @route   POST /api/auth/register
// router.post('/register', registerUser);
 
// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   POST /api/auth/logout
router.post('/logout', protect, logoutUser);








export default router;

