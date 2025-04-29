import React from "react";
import { Routes, Route } from "react-router-dom";
import MyCourses from "./pages/MyCourses/MyCourses.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Hero from "./components/Hero";
import Dashboard from "./pages/Dashboard";
import TeachingSkills from "./pages/TeachingSkills";
import ProtectedRoute from "./util/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import CourseForm from "./pages/MyCourses/CourseForm.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import "./App.css";
import LearningProgress from "./pages/LearningProgress.jsx";
import LearningInterests from "./pages/LearningInterests.jsx";
import FindConnections from "./pages/FindConnections.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="teaching-skills" element={<TeachingSkills />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="create-course" element={<CourseForm />} />
          <Route path="/dashboard/mycourse/:id" element={<MyCourses />} />
          {/* Your new LessonPage Route */}
          <Route path="/dashboard/progress" element={<LearningProgress/>} />
          <Route path="/dashboard/interests" element={<LearningInterests />} />
          <Route path="/dashboard" element={<Dashboard />} />    {/* Dashboard component home par */}
          <Route path="/dashboard/update-profile" element={<UpdateProfilePage />} /> {/* Update Profile page */}
          <Route path="/dashboard/connections" element = {<FindConnections/>} />
          {/* <Route path="/dashboard/intrests" element={<LessonPage/>
          <Route path="/dashboard/learning/:courseId/:lessonId" element={<LessonPage />} /> */}
          

        </Route>
      </Routes>

    </div>
  );
};

export default App;
