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
import UserCourses from "./pages/MyCourses/UserCourses.jsx";
import AllCourses from "./pages/allCourses/AllCourses.jsx"
import ReviewList from "./pages/ReviewList.jsx";
import Settings from "./pages/Settings.jsx";


const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/mycourses/:userId" element={<UserCourses />} />
 
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
          <Route path="mycourse/:id" element={<MyCourses />} />
          <Route path="progress" element={<LearningProgress />} />
          <Route path="interests" element={<LearningInterests />} />
          <Route path="update-profile" element={<UpdateProfilePage />} />
          <Route path="connections" element={<FindConnections />} />
          <Route path="/dashboard/reviews" element={<ReviewList />} />
          <Route path="/dashboard/settings" element={<Settings/>} />
          <Route path="/dashboard/bookmarked" element={<AllCourses />} />
        </Route>
      </Routes>
   
    </div>
  );
};

export default App;
