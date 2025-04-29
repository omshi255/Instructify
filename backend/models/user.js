// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  profilePic: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
  },
  learningInterests: {
    type: [String],
    default: [] // Array of strings like topic names or YouTube video links
  },
  bio: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  // New field to store user's activity (e.g., YouTube link visits, time spent, etc.)
  activityLog: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' // Reference to the Course model (assuming it's a separate model in your app)
    },
    topic: String,
    category: String,
    youtubeLink: String, // Store YouTube video link here
    timeSpent: {
      type: Number, // Time spent on the YouTube link or course (in minutes or seconds)
      default: 0
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);