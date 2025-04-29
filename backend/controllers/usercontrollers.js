// controllers/authController.js
import User from '../models/user.js';  // Ensure this path is correct
import bcrypt from 'bcryptjs';
import { log } from 'console';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';



// Register User
const registerUser = async (req, res) => {
  const { name, email, password , bio , description, linkedin, discord, github, twitter, instagram, facebook, portfolio } = req.body;

  // Validate text fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profilePic upload to Cloudinary
    let profilePic = null;
    if (req.file) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: 'profilePic',
        });
        profilePic = uploadResponse.secure_url;

        // Delete temporary file
        await fs.unlink(req.file.path);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError.message);
        return res.status(500).json({ message: 'Failed to upload profile picture' });
      }
    }

    // Save user with profilePic
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
      bio,  // Add bio
      description,  // Add description
      linkedin,
      discord,
      github,
      twitter,
      instagram,
      facebook,
      portfolio,
    });

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
        bio: newUser.bio,  // Include bio in response
        description: newUser.description,  // Include description in response
        linkedin: newUser.linkedin,
        discord: newUser.discord,
        github: newUser.github,
        twitter: newUser.twitter,
        instagram: newUser.instagram,
        facebook: newUser.facebook,
        portfolio: newUser.portfolio,
      },
    });
  } catch (err) {
    console.error('Error in registerUser:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// controllers/usercontrollers.js

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("email:", email)
    console.log("password:", password)
    if(!email || !password) { 
      return res.status(400).json({ message: "Please provide email and password" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email

        }
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
      console.log("error:" ,err.message )
    }
  };
  
  // Logout User
  const logoutUser = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
  };

  const getCurrentUser = (req, res) => {
    const user = req.user; // This will be populated by the protect middleware
    console.log("Current user:", user);
    res.status(200).json({ user });
  }
  // controllers/usercontrollers.js

// Update User Profil
const updateUserProfile = async (req, res) => {
  const { name, bio, description, profilePic } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate and handle profilePic upload to Cloudinary
    if (profilePic && profilePic.startsWith('data:image/')) {
      // Estimate decoded image size (base64 is ~33% larger than binary)
      const base64Data = profilePic.split(',')[1]; // Remove "data:image/..." prefix
      const binarySize = (base64Data.length * 3) / 4; // Approximate binary size in bytes
      if (binarySize > 5 * 1024 * 1024) {
        return res.status(400).json({ message: 'Image size exceeds 5MB limit' });
      }

      // Delete old image if it exists
      if (user.profilePic) {
        const imageId = user.profilePic.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`profile/${imageId}`);
      }

      // Upload new image
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: 'profile',
      });
      user.profilePic = uploadResponse.secure_url;
    } else if (profilePic) {
      return res.status(400).json({ message: 'Invalid image format. Must be a base64-encoded image' });
    }

    // Update only provided fields
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (description !== undefined) user.description = description;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        description: user.description,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// controllers/usercontrollers.js

 const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const addLearningInterest = async (req, res) => {
  try {
    const {interest} = req.body;
    const userId = req.user;

    if (!interest) {
      return res.status(400).json({ message: "Interest is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.learningInterests.includes(interest)) {
      return res.status(400).json({ message: "Interest already added" });
    }

    user.learningInterests.push(interest);
    await user.save();

    res.status(200).json({ message: "Interest added successfully", learningInterests: user.learningInterests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove a learning interest
const removeLearningInterest = async (req, res) => {
  try {
    const userId = req.user;
    const {interest} = req.body;

    if (!interest) {
      return res.status(400).json({ message: "Interest is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.learningInterests.indexOf(interest);

    if (index === -1) {
      return res.status(400).json({ message: "Interest not found" });
    }

    user.learningInterests.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Interest removed successfully", learningInterests: user.learningInterests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get learning interests of a user
const getLearningInterests = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select('learningInterests');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Learning interests fetched successfully", 
      learningInterests: user.learningInterests 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

 // controllers/usercontrollers.js

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "All registered users fetched successfully",
      users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { registerUser, loginUser, logoutUser,getCurrentUser ,updateUserProfile , deleteUserProfile,addLearningInterest ,removeLearningInterest ,getLearningInterests,getAllUsers };