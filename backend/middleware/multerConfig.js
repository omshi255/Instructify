import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const uploadDir = "uploads"; // Define the upload directory

// Check if the upload directory exists, if not create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Directory '${uploadDir}' created successfully.`);
} else {
  console.log(`Directory '${uploadDir}' already exists.`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf", // PDF files
    "application/msword", // .doc files
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx files
    "application/vnd.ms-powerpoint", // .ppt files
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx files
    "application/vnd.ms-excel", // .xls files
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx files
    "image/jpeg", // JPEG images
    "image/png", // PNG images
    "image/jpg", // JPG images
    "image/gif", // GIF images
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // Max file size: 200MB
});
