// controllers/authController.js
import User from '../models/user.js';  // Ensure this path is correct
import bcrypt from 'bcryptjs';
import { log } from 'console';
import jwt from 'jsonwebtoken';



// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let {profilePic} = req.body; // Get profilePic from request body
  
    

  try {
    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if profilePic is provided
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "profilePic",
      });
      profilePic = uploadResponse.secure_url;
    }

    // Save user with profile pic
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic
    });

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
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
  
  export { registerUser, loginUser, logoutUser };