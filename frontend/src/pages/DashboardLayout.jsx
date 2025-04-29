// import { Link, Outlet } from 'react-router-dom';
// import './DashboardLayout.css';
// import Dashboard from './Dashboard';

// const dashboardLinks = [
//   { to: "/dashboard/teaching-skills", label: "🧠 My Teaching Skills" },
//   { to: "/dashboard/mycourses", label: "📘 My Courses" },
//   { to: "/dashboard/interests", label: "🎯 My Learning Interests" },
//   { to: "/dashboard/progress", label: "📈 Learning Progress" },
//   { to: "/dashboard/continue", label: "▶️ Continue Learning" },
//   { to: "/dashboard/bookmarked", label: "🔖 Bookmarked Courses" },
//   { to: "/dashboard/matches", label: "🤝 Skill Exchange Matches" },
//   { to: "/dashboard/reviews", label: "⭐ My Reviews" },
//   { to: "/dashboard/power-score", label: "🏅 My Power Score" },
//   { to: "/dashboard/settings", label: "⚙️ Profile Settings" },
// ];

// const DashboardLayout = () => {
//   return (
//    <>
//      <Dashboard />
//      <div className="dashboard-page">
//       <h2 className="dashboard-title">📚 Instructify Dashboard</h2>

//       <div className="dashboard-grid">
//         {dashboardLinks.map((link, index) => (
//           <Link key={index} to={link.to} className="dashboard-card">
//             {link.label}
//           </Link>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         <Outlet />
//       </div>
//     </div>
   
//    </>
//   );
// };

// export default DashboardLayout;
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaBrain, FaBookOpen, FaBullseye, FaChartLine, FaPlayCircle,
  FaBookmark, FaStar, FaMedal, FaCog
} from 'react-icons/fa';
import './DashboardLayout.css';

const dashboardLinks = [
  { to: "/dashboard/teaching-skills", icon: <FaBrain />, label: "Teaching Skills" },
  { to: "/dashboard/mycourses", icon: <FaBookOpen />, label: "My Courses" },
  { to: "/dashboard/interests/", icon: <FaBullseye />, label: "Learning Interests" },
  { to: "/dashboard/progress", icon: <FaChartLine />, label: "Learning Progress" },
  { to: "/dashboard/connections", icon: <FaPlayCircle />, label: "Find Connections" },
  { to: "/dashboard/bookmarked", icon: <FaBookmark />, label: "Bookmarked Courses" },
  { to: "/dashboard/reviews", icon: <FaStar />, label: "My Reviews" },
  { to: "/dashboard/power-score", icon: <FaMedal />, label: "Power Score" },
  { to: "/dashboard/settings", icon: <FaCog />, label: "Settings" },
];

const DashboardLayout = () => {
  return (
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
  );
};

export default DashboardLayout;
