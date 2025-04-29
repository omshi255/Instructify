import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CourseForm.css"; // for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare ,faCirclePlus, faTrashAlt ,faCheckCircle, faPaperPlane ,faChalkboard} from "@fortawesome/free-solid-svg-icons";



const CourseForm = ({ fetchCourses, editCourse, setEditCourse }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    price: "",
    lessons: [],
  });

  const token = localStorage.getItem("token");

  // ✅ Pre-fill when editing
  useEffect(() => {
    if (editCourse) {
      setForm({
        title: editCourse.title || "",
        description: editCourse.description || "",
        category: editCourse.category || "",
        thumbnail: editCourse.thumbnail || "",
        price: editCourse.price || "",
        lessons: editCourse.lessons || [],
      });
    } else {
      setForm({
        title: "",
        description: "",
        category: "",
        thumbnail: "",
        price: "",
        lessons: [],
      });
    }
  }, [editCourse]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, e) => {
    const updatedLessons = [...form.lessons];
    updatedLessons[index][e.target.name] = e.target.value;
    setForm({ ...form, lessons: updatedLessons });
  };

  const addLesson = () => {
    setForm((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        { title: "", content: "", videoUrl: "", pdfUrl: "", imageUrl: "" },
      ],
    }));
  };

  const removeLesson = (index) => {
    const updatedLessons = [...form.lessons];
    updatedLessons.splice(index, 1);
    setForm({ ...form, lessons: updatedLessons });
  };

  const handleSubmit = async () => {
    const { title, description, category, thumbnail } = form;

    if (!title || !description || !category || !thumbnail) {
      toast.warning("All fields are required");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (editCourse) {
        await axios.put(
          `http://localhost:5000/api/courses/${editCourse._id}`,
          form,
          config
        );
        toast.success("Course updated!");
        setEditCourse(null);
      } else {
        await axios.post("http://localhost:5000/api/courses", form, config);
        toast.success("Course created!");
      }

      setForm({
        title: "",
        description: "",
        category: "",
        thumbnail: "",
        price: "",
        lessons: [],
      });

      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-section">
      <h3>
  <FontAwesomeIcon icon={editCourse ? faPenToSquare : faPlus} />{" "}
  {editCourse ? "Edit Course" : "Add New Course"}
</h3>

      <input
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        name="thumbnail"
        placeholder="Thumbnail URL"
        value={form.thumbnail}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price (optional)"
        value={form.price}
        onChange={handleChange}
      />

      {/* ✅ Lessons */}
      <div className="lessons-section">
      <h4 className="lessons">
  <FontAwesomeIcon icon={faChalkboard} />
  Lessons
</h4>
        {form.lessons.map((lesson, index) => (
          <div key={index} className="lesson-block">
            <input
              name="title"
              placeholder="Lesson Title"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, e)}
            />
            <input
              name="content"
              placeholder="Content"
              value={lesson.content}
              onChange={(e) => handleLessonChange(index, e)}
            />
            <input
              name="videoUrl"
              placeholder="Video URL"
              value={lesson.videoUrl}
              onChange={(e) => handleLessonChange(index, e)}
            />
            <input
              name="pdfUrl"
              placeholder="PDF URL"
              value={lesson.pdfUrl}
              onChange={(e) => handleLessonChange(index, e)}
            />
            <input
              name="imageUrl"
              placeholder="Image URL"
              value={lesson.imageUrl}
              onChange={(e) => handleLessonChange(index, e)}
            />
            <button
              type="button"
              onClick={() => removeLesson(index)}
              className="remove-btn"
            >
                <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: "8px" }} /> Remove Lesson
            </button>
          </div>
        ))}
        <button type="button" onClick={addLesson} className="add-lesson-btn">
        <FontAwesomeIcon icon={faCirclePlus} style={{ marginRight: "8px" }} /> Add Lesson
        </button>
      </div>

      {/* ✅ Cancel Editing */}
      {editCourse && (
        <button
          type="button"
          onClick={() => setEditCourse(null)}
          className="remove-btn"
        >
          Cancel Editing
        </button>
      )}

      {/* ✅ Submit */}
      <button onClick={handleSubmit} className="submit-btn">
  <FontAwesomeIcon
    icon={editCourse ? faCheckCircle : faPaperPlane}
    style={{ marginRight: "8px" }}
  />
  {editCourse ? "Update Course" : "Create Course"}
</button>

    </div>
  );
};

export default CourseForm;
