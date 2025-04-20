import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
// import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero';
import Dashboard from './pages/Dashboard.jsx';

import ProtectedRoute from "./util/ProtectedRoute.jsx"

const App = () => {
  
  return (
    <div>
      

    {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute children={<Dashboard />} />}
        />
        <Route path="/logout" element={<Logout />} />
        
      </Routes>
    </div>
  );
};

export default App;
