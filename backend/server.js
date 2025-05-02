import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // Authentication routes
import userRoutes from './routes/userRoutes.js'; // User routes (learning-interests)
import cors from 'cors';
import { v2 as cloudinary } from "cloudinary";
import teachingSkillRoutes from './routes/teachingSkillRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";

import reviewRoutes from './routes/reviewRoutes.js';


import path from "path";
dotenv.config({ path: "./backend/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const allowedOrigins = [
  'http://localhost:3000', // development frontend
  'https://instructifyfin.onrender.com/' // production frontend
];

connectDB(); // Connect MongoDB

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
})); // Enable CORS
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Register routes
app.use('/api/auth', authRoutes); // For authentication routes
app.use('/api/user', userRoutes); // For user-related routes (learning-interests)
app.use('/api/teachingskills', teachingSkillRoutes);
app.use("/api/courses", courseRoutes);
app.use('/api/review', reviewRoutes);
 // For messaging routes

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
