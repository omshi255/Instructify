import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaSpinner, FaAddressCard } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TeachingSkills.css';

import Lottie from "lottie-react";
import learningAnimation from "../animations/Animation - 1745587232807.json";
import Footer from '../components/Footer.jsx'; // Adjust the import path as necessary
const SkillsDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ token har request pe fresh uthao
  const getConfig = () => ({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/teachingskills', getConfig());
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const createSkills = async () => {
    try {
      if (!newSkill.trim()) {
        toast.warn('Please enter a skill');
        return;
      }
      setLoading(true);

      await axios.post('/api/teachingskills', { skills: [newSkill] }, getConfig());
      toast.success('Skill added successfully');
      setNewSkill('');
      fetchSkills();
    } catch (error) {
      console.error('Create error:', error);
      toast.error(error.response?.data?.message || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  

  const deleteSkill = async (skill) => {
    try {
      await axios.patch('/api/teachingskills/delete-skill', { skill }, getConfig());
      toast.success(`Deleted skill: ${skill}`);
      fetchSkills();
    } catch (error) {
      console.error('Delete skill error:', error);
      toast.error('Failed to delete skill');
    }
  };

  const deleteAllSkills = async () => {
    try {
      await axios.delete('/api/teachingskills/all', getConfig());
      toast.success('All skills deleted successfully');
      setSkills([]);
    } catch (error) {
      console.error('Delete all error:', error);
      toast.error('Failed to delete all skills');
    }
  };

  return (
    <>
     
      <div className="dashboard">
        <div className="dashboard-container-two-column">
          {/* Left side: Animation */}
          <div className="dashboard-animation">
            <Lottie animationData={learningAnimation} loop={true} />
          </div>

          {/* Right side: Skills Form + List */}
          <div className="dashboard-content">
            <h1 className="dashboard-title"><FaAddressCard /> Teaching Skills.....</h1>

            <div className="add-skill-section">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter new skill"
                className="skill-input"
              />
              <button
                type="button"
                onClick={createSkills}
                className="add-btn"
                disabled={loading}
              >
                {loading ? <FaSpinner className="spinner-icon" /> : <FaPlus />}
              </button>
            </div>

            {loading && skills.length === 0 ? (
              <p className="loading-text">Loading skills...</p>
            ) : skills.length > 0 ? (
              <div className="skills-grid">
                {skills.map((skill, idx) => (
                  <div key={`${skill}-${idx}`} className="skill-card">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => deleteSkill(skill)}
                      className="delete-btn"
                      aria-label={`Delete ${skill}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-skills-text">No skills added yet.</p>
            )}

            <div className="actions">
            

              <button type="button" onClick={deleteAllSkills} className="delete-all-btn">
                <FaTrash /> Delete All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Footer/>
    </>
  );
};

export default SkillsDashboard;
