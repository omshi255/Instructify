
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaBrain, FaBookOpen, FaBullseye, FaChartLine, FaPlayCircle,
  FaBookmark, FaStar, FaCog
} from 'react-icons/fa';
import './DashboardLayout.css';
import DashboardNavbar from "../pages/DashboardNavbar.jsx";

const dashboardLinks = [
  { to: "/dashboard/teaching-skills", icon: <FaBrain />, label: "Teaching Skills" },
  { to: "/dashboard/mycourses", icon: <FaBookOpen />, label: "My Courses" },
  { to: "/dashboard/interests/", icon: <FaBullseye />, label: "Learning Interests" },
  { to: "/dashboard/progress", icon: <FaChartLine />, label: "Learning Progress" },
  { to: "/dashboard/connections", icon: <FaPlayCircle />, label: "Find Connections" },
  { to: "/dashboard/bookmarked", icon: <FaBookmark />, label: "Bookmarked Courses" },
  { to: "/dashboard/reviews", icon: <FaStar />, label: "My Reviews" },
  { to: "/dashboard/settings", icon: <FaCog />, label: "Settings" },
];

const DashboardLayout = () => {
  return (<>
        <DashboardNavbar />
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        {dashboardLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className="dashboard-link"
            activeclassname="active-link"
          >
            <div className="icon">{link.icon}</div>
            <div className="label">{link.label}</div>
          </NavLink>
        ))}
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
    </>);
};

export default DashboardLayout;
