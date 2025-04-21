

# 🎓 Instructify – Skill Sharing App (MERN Stack)

Instructify is a full-stack skill sharing platform where users can either learn or teach skills through structured online courses. Built using the MERN stack.

---

## 🚀 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (already implemented)

---

## 👤 User Roles

- `student` – Enroll in and complete courses
- `instructor` – Create and manage courses
- `admin` – (optional, later) Platform moderation

---

## 🧑‍💻 Common User Features

### 🔐 Profile & Account
- View profile: name, bio, avatar, social links
- Edit profile: update name, bio, avatar
- Change password
- Role-based access: student / instructor / admin

### 📊 Dashboard
- If **student**: View enrolled courses
- If **instructor**: View created courses

---

## 🎓 Student Features

- 🔍 **Browse Courses**
  - Filter by category, tags, difficulty level
  - Search by course title or description

- ✅ **Enroll in Courses**
  - Join free/paid courses

- 🎥 **View Lessons**
  - Watch videos with additional resources
  - Embedded lessons structure

- ⏱️ **Progress Tracking**
  - Mark lessons as completed
  - Resume from last watched lesson

- ⭐ **Course Reviews**
  - Leave rating + comment after course completion

- 🔖 **Bookmarks**
  - Save favorite courses for later

---

## 🧑‍🏫 Instructor Features

- ✍️ **Create Courses**
  - Add title, description, category, level, language, and thumbnail

- 🎬 **Add Lessons**
  - Embedded lesson structure (title, video, duration, resources)

- ✏️ **Edit/Delete Course or Lesson**

- 🚦 **Publish/Unpublish Courses**

- 📈 **Track Enrollments**
  - Count and view students enrolled in each course

- 💬 **Read Reviews**

- 💰 **Earnings Dashboard** (Optional)
  - Monitor income from paid courses (to be added later)

---

## ⚙️ Admin Features (Optional - Planned for Later)

- 👥 Manage users (ban/delete)
- ✅ Approve/review instructor courses
- 🗨️ Moderate reviews/comments
- 🏷️ Manage course categories

---

## ✅ Completed So Far

- [x] User login/signup with JWT ✅
- [x] Role-based access system ✅
- [x] Frontend design for key screens ✅

---

## 📦 Coming Next (Backend Dev Plan)

- [ ] Course model with embedded lessons
- [ ] Course creation/edit/delete APIs
- [ ] Enrollment and progress tracking APIs
- [ ] Dashboard integration with frontend
- [ ] Reviews, bookmarks and resume functionality

---

## 🧠 Ideas for Later

- Add chat/forum per course
- Instructor earnings + payout tracking
- Social sharing / invite system

---



## 🧩 MongoDB Schema Diagram

![Instructify DB Schema](./instructify_db_schema%20-%20Copy.png)




Made with ❤️ using MERN stack by Swati sen
