// src/layouts/MainLayout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Routes where navbar shold be hidden (like login, register, dashboard)
  const hideNavbarRoutes = ['/dashboard'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
