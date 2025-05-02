
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./LearningIntrests.css";

import Footer from "../components/Footer";
const LearningInterests = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/auth/get-learning-interest`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const validInterests = data.learningInterests.filter(
          (interest) => interest !== null
        );
        setInterests(validInterests);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load learning interests");
      }
    };

    fetchInterests();
  }, [loading]);

  const handleCreateInterest = async (e) => {
    e.preventDefault();
    if (!newInterest.trim()) {
      toast.error("Interest cannot be empty");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/api/auth/add-learning-interest`,
        { interest: newInterest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Interest added successfully!");
      setNewInterest("");
      setOpenForm(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add interest");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInterest = async (interest) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5000/api/auth/delete-learning-interest`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { interest },
        }
      );
      toast.success("Interest deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete interest");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
  
    <div className="learning-container">
      <h2 className="learning-title">Learning Interests</h2>

      <button
        className="add-interest-btn"
        onClick={() => setOpenForm(!openForm)}
        disabled={loading}
      >
        {openForm ? "Close" : "Add Interest"}
      </button>

      {openForm && (
        <form onSubmit={handleCreateInterest} className="interest-form">
          <input
            type="text"
            placeholder="Add new interest..."
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            disabled={loading}
            className="interest-input"
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      )}

      <div className="interest-list">
        {interests.length === 0 ? (
          <p className="no-interests">No interests found. Add some!</p>
        ) : (
          interests.map((interest) => (
            <div className="interest-item" key={interest}>
              <span className="interest-name">{interest}</span>
              <button
                className="delete-btn-dis"
                onClick={() => handleDeleteInterest(interest)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
   <Footer/>
   </>
  );
};

export default LearningInterests;
