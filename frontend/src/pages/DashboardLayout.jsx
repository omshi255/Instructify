import { Link, Outlet } from 'react-router-dom';
import './DashboardLayout.css'; // Import custom CSS
import Dashboard from './Dashboard';

const DashboardLayout = () => {
  return (
    <div>
      <Dashboard />
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">📚 Instructify</div>
          <nav className="sidebar-nav">
            <Link to="/dashboard/teaching-skills">🧠 My Teaching Skills</Link>
            <Link to="/dashboard/courses">📘 My Courses</Link>
            <Link to="/dashboard/create-course">➕ Create Course</Link>
            <Link to="/dashboard/interests">🎯 My Learning Interests</Link>
            <Link to="/dashboard/progress">📈 Learning Progress</Link>
            <Link to="/dashboard/continue">▶️ Continue Learning</Link>
            <Link to="/dashboard/bookmarked">🔖 Bookmarked Courses</Link>
            <Link to="/dashboard/matches">🤝 Skill Exchange Matches</Link>
            <Link to="/dashboard/reviews">⭐ My Reviews</Link>
            <Link to="/dashboard/power-score">🏅 My Power Score</Link>
            <Link to="/dashboard/settings">⚙️ Profile Settings</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
