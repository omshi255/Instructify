import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const TrackYouTubeActivity = ({ userId }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [youtubeLink, setYoutubeLink] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  const handleTimeSpentChange = (e) => {
    setTimeSpent(e.target.value);
  };

  const handleYouTubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleTrackActivity = async () => {
    try {
      // Sending the tracked activity data to the backend
      await axios.post('/api/activity/track-activity', {
        userId,
        youtubeLink,
        timeSpent: parseInt(timeSpent),
      });
      alert('Activity tracked successfully!');

      // Navigate to /dashboard/interests page after success
      navigate('/dashboard/interests'); // Add path to the learning interests page
    } catch (error) {
      alert('Error tracking activity');
    }
  };

  return (
    <div>
      <h2>Track YouTube Activity</h2>
      <input
        type="text"
        placeholder="Enter YouTube Video Link"
        value={youtubeLink}
        onChange={handleYouTubeLinkChange}
      />
      <input
        type="number"
        placeholder="Enter Time Spent (in minutes)"
        value={timeSpent}
        onChange={handleTimeSpentChange}
      />
      <button onClick={handleTrackActivity}>Track Activity</button>
    </div>
  );
};

export default TrackYouTubeActivity;
