
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./LearningProgress.css";

import Footer from "../components/Footer.jsx"; // Import the Footer component
const ProgressPage = () => {
  // Dummy data for graph
  const hourlyData = [
    { hour: '00:00', videosWatched: 1 },  // Midnight - 12 AM
    { hour: '01:00', videosWatched: 1 },  // 1 AM
    { hour: '02:00', videosWatched: 1 },  // 2 AM
    { hour: '03:00', videosWatched: 1 },  // 3 AM
    { hour: '04:00', videosWatched: 1 },  // 4 AM
    { hour: '05:00', videosWatched: 2 },  // 5 AM
    { hour: '06:00', videosWatched: 2 },  // 6 AM
    { hour: '07:00', videosWatched: 3 },  // 7 AM
    { hour: '08:00', videosWatched: 3 },  // 8 AM
    { hour: '09:00', videosWatched: 3 },  // 9 AM
    { hour: '10:00', videosWatched: 3 },  // 10 AM
    { hour: '11:00', videosWatched: 3 },  // 11 AM
    { hour: '12:00', videosWatched: 3 },  // Noon
    { hour: '13:00', videosWatched: 3 },  // 1 PM
    { hour: '14:00', videosWatched: 3 },  // 2 PM
    { hour: '15:00', videosWatched: 2 },  // 3 PM
    { hour: '16:00', videosWatched: 2 },  // 4 PM
    { hour: '17:00', videosWatched: 2 },  // 5 PM
    { hour: '18:00', videosWatched: 2 },  // 6 PM
    { hour: '19:00', videosWatched: 2 },  // 7 PM
    { hour: '20:00', videosWatched: 3 },  // 8 PM
    { hour: '21:00', videosWatched: 3 },  // 9 PM
    { hour: '22:00', videosWatched: 3 },  // 10 PM
    { hour: '23:00', videosWatched: 2 },  // 11 PM
  ];

  return (
    <>
   
      <div className="progress-page-container">
        <p className="graph-subtext">
          This graph represents the learning progress on a day-by-day basis. The data shows the total number of videos watched throughout the day, providing an overview of how students engage with learning content at different hours.
        </p>

        <div className="progress-content">
          {/* Loading section removed */}
        </div>

        {/* New Graph Section */}
        <div className="graph-section">
          <h3 className="graph-title">Day Wise Learning Overview</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={hourlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" /> {/* Using 'hour' as the X-axis */}
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="videosWatched" stroke="#8884d8" strokeWidth={3} /> {/* Using 'videosWatched' as the dataKey */}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default ProgressPage;
