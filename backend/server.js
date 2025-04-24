// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import { v2 as cloudinary } from "cloudinary";
import teachingSkillRoutes from './routes/teachingSkillRoutes.js';



dotenv.config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB(); // Connect MongoDB

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
//all api
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use('/api/auth', authRoutes);
app.use('/api/teaching-skills', teachingSkillRoutes);


app.get('/', (req, res) => {
  res.send(' API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
