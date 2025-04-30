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
 // Import the messaging routes
import http from 'http';
import { Server as socketIo } from 'socket.io'; // Correct import

dotenv.config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB(); // Connect MongoDB

const app = express();
const server = http.createServer(app); // Create an HTTP server from the express app
const io = new socketIo(server); // Set up Socket.IO

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Register routes
app.use('/api/auth', authRoutes); // For authentication routes
app.use('/api/user', userRoutes); // For user-related routes (learning-interests)
app.use('/api/teachingskills', teachingSkillRoutes);
app.use("/api/courses", courseRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/review', reviewRoutes);
 // For messaging routes

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages from clients
    socket.on('send_message', (data) => {
        console.log('Message received:', data);

        // Broadcast the message to other users (real-time)
        socket.broadcast.emit('receive_message', data);
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
