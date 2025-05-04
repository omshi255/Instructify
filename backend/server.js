import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teachingSkillRoutes from "./routes/teachingSkillRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./backend/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB(); // Connect MongoDB

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teachingskills", teachingSkillRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/review", reviewRoutes);

// Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// Serve React app for all non-API routes
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "../frontend/build", "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Failed to serve index.html:", err);
        res.status(500).send("Server Error: Unable to load the application");
      }
    });
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
