// Course.js
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  videoUrl: { type: String },
  pdfUrl: { type: String },       // ✅ Optional PDF
  imageUrl: { type: String }      // ✅ Optional Image
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  thumbnail: { type: String },
  lessons: [lessonSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;
