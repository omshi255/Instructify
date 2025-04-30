import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
    learningInterests: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    linkedin: { type: String, default: "" },
    discord: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    // New bookmarks field to store bookmarked course IDs
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    activityLog: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        topic: String,
        category: String,
        youtubeLink: String,
        timeSpent: {
          type: Number,
          default: 0,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
