// // server.js
// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import cors from 'cors';
// import { v2 as cloudinary } from "cloudinary";
// import teachingSkillRoutes from './routes/teachingSkillRoutes.js';
// import courseRoutes from "./routes/courseRoutes.js";
// import activityRoutes from './routes/activity.js'; // Import the activity routes


// dotenv.config(); // Load environment variables

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// connectDB(); // Connect MongoDB

// const app = express();

// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON requests
// //all api
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
// app.use('/api/auth', authRoutes);
// app.use('/api/teachingskills', teachingSkillRoutes);
// app.use("/api/courses", courseRoutes);
// app.use('/api/activity', activityRoutes);

// app.get('/', (req, res) => {
//   res.send(' API is running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // Authentication routes
import userRoutes from './routes/userRoutes.js'; // User routes (learning-interests)
import cors from 'cors';
import { v2 as cloudinary } from "cloudinary";
import teachingSkillRoutes from './routes/teachingSkillRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";
import activityRoutes from './routes/activity.js';
import reviewRoutes from './routes/reviewRoutes.js';
dotenv.config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB(); // Connect MongoDB

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Register the routes
app.use('/api/auth', authRoutes); // For authentication routes
app.use('/api/user', userRoutes); // For user-related routes (learning-interests)
app.use('/api/teachingskills', teachingSkillRoutes);
app.use("/api/courses", courseRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/review', reviewRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
