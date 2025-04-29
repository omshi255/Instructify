// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser,
     logoutUser,getCurrentUser
      ,updateUserProfile ,
       deleteUserProfile ,
       addLearningInterest 
       ,removeLearningInterest 
       ,getLearningInterests} from '../controllers/usercontrollers.js';
import { protect } from '../middleware/Authmiddleware.js'; // Import the protect middleware
import { upload } from "../middleware/multerConfig.js";
import { getUserProfile } from '../controllers/usercontrollers.js';
// import upload from '../config/multer.js'; // Import the multer configuration

const router = express.Router();
router.post('/register', upload.single('profilePic'), registerUser);

// @route   POST /api/auth/register
// router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   POST /api/auth/logout
router.post('/logout', protect, logoutUser);
router.get('/me', protect, getCurrentUser);
// Update User Profile
router.put('/update-profile', protect, updateUserProfile); 

// Delete User Profile
router.delete('/delete-profile', protect, deleteUserProfile); // This is the new route for deleting a profile
router.post('/add-learning-interest', protect, addLearningInterest); // This is the new route for adding a learning interest
router.delete('/delete-learning-interest', protect, removeLearningInterest); // This is the new route for deleting a learning interest
router.get('/get-learning-interest', protect, getLearningInterests); // This is the new route for getting a user profile

export default router;
