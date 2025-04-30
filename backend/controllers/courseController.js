import Course from "../models/Course.js";
import User from "../models/user.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    console.log("Creating course → req.body:", req.body);
    const { title, description, category, thumbnail, lessons } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    if (lessons && Array.isArray(lessons)) {
      for (let i = 0; i < lessons.length; i++) {
        if (!lessons[i].title) {
          return res
            .status(400)
            .json({
              success: false,
              message: `Lesson ${i + 1} is missing title`,
            });
        }
      }
    }

    const course = new Course({
      title,
      description,
      category,
      thumbnail,
      lessons,
      createdBy: req.user.id,
    });

    const saved = await course.save();

    console.log(`✅ Course created: ${saved.title} (ID: ${saved._id})`);

    res.status(201).json({ success: true, course: saved });
  } catch (error) {
    console.error("❌ Error creating course:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating course",
        error: error.message,
      });
  }
};

// Get courses created by logged-in user
export const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const courses = await Course.find({ createdBy: req.user.id });
    const coursesWithBookmarkStatus = courses.map((course) => ({
      ...course._doc,
      isBookmarked: user.bookmarks.includes(course._id),
    }));

    console.log(
      `✅ Fetched ${courses.length} course(s) for user: ${req.user.id}`
    );
    res.status(200).json({ success: true, courses: coursesWithBookmarkStatus });
  } catch (error) {
    console.error("❌ Error fetching courses:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching courses",
        error: error.message,
      });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    console.log(`🗑️ Course deleted: ${course.title} (ID: ${course._id})`);

    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (error) {
    console.error("❌ Error dajeleting course:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting course",
        error: error.message,
      });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    console.log("Updating course → req.body:", req.body);

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (!req.user || course.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const { title, description, category, thumbnail, lessons } = req.body;

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (category !== undefined) course.category = category;
    if (thumbnail !== undefined) course.thumbnail = thumbnail;
    if (Array.isArray(lessons)) course.lessons = lessons;

    const updatedCourse = await course.save();

    console.log(
      `✏️ Course updated: ${updatedCourse.title} (ID: ${updatedCourse._id})`
    );

    res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.error("❌ Error updating course:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get courses by a specific user ID
export const getCoursesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const courses = await Course.find({ createdBy: userId });
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found for this user" });
    }

    const coursesWithBookmarkStatus = courses.map((course) => ({
      ...course._doc,
      isBookmarked: user.bookmarks.includes(course._id),
    }));

    console.log(`✅ Fetched ${courses.length} course(s) for user: ${userId}`);
    res.status(200).json({ success: true, courses: coursesWithBookmarkStatus });
  } catch (error) {
    console.error("❌ Error fetching courses:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching courses",
        error: error.message,
      });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const courses = await Course.find({});
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }

    const coursesWithBookmarkStatus = courses.map((course) => ({
      ...course._doc,
      isBookmarked: user.bookmarks.includes(course._id),
    }));

    console.log(`✅ Fetched ${courses.length} course(s)`);
    res.status(200).json({ success: true, courses: coursesWithBookmarkStatus });
  } catch (error) {
    console.error("❌ Error fetching all courses:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching courses",
        error: error.message,
      });
  }
};
