// src/components/UsersList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import './FindConnections.css'

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all registered users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/all-users");
        setUsers(response.data.users); // Save the users data in state
        setLoading(false);
      } catch (error) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="users-list">
      <h2>All Registered Users</h2>
      <div className="users-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <img
              src={user.profilePic || "https://via.placeholder.com/150"} // Default image if profile pic not available
              alt={user.name}
              className="user-avatar"
            />
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
            <p>Learning Interests: {user.learningInterests.join(", ")}</p>
            <p>description : {user.description}</p>
            <p>description : {user.linkedin}</p>
            <p>description : {user.github}</p>
            <p>description : {user.discord}</p>
            <p>description : {user.instagram}</p>
            <p>description : {user.twitter}</p>
            <p>description : {user.facebook}</p>
            <p>description : {user.portfolio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
