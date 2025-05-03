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

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB(); // Connect MongoDB

const app = express();


// Middleware
app.use(cors()); // Enable CORS
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



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
