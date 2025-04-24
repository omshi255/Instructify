import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Hero from './components/Hero';

import Dashboard from './pages/Dashboard';
import TeachingSkills from './pages/TeachingSkills';
import ProtectedRoute from './util/ProtectedRoute';
import DashboardLayout from './pages/DashboardLayout'; // Make sure path is correct

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Dashboard Layout */}
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
          {/* ⬇️ Add more dashboard routes here */}
          {/* <Route path="courses" element={<Courses />} /> */}
          {/* <Route path="create-course" element={<CreateCourse />} /> */}
          {/* <Route path="settings" element={<ProfileSettings />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
