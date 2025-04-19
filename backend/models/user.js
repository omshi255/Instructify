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
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
