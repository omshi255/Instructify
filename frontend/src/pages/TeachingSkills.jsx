import { useEffect, useState } from 'react';
import axios from 'axios';
import './TeachingSkills.css'; // 👈 Custom CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeachingSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/teaching-skills', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(res.data.skills || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
        toast.error("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchSkills();
  }, [token]);

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();

    // 🛑 Validation Checks
    if (!trimmedSkill) {
      toast.warning("Skill cannot be empty!");
      return;
    }

    if (trimmedSkill.length < 2) {
      toast.warning("Skill must be at least 2 characters.");
      return;
    }

    if (/^\d+$/.test(trimmedSkill)) {
      toast.warning("Skill name can't be all numbers.");
      return;
    }

    const isDuplicate = skills.some(skill => skill.toLowerCase() === trimmedSkill.toLowerCase());
    if (isDuplicate) {
      toast.info("Skill already added.");
      return;
    }

    if (skills.length >= 25) {
      toast.error("You can only add up to 25 skills.");
      return;
    }

    // ✅ Add skill
    setSkills([...skills, trimmedSkill]);
    setNewSkill('');
    toast.success("Skill added!");
  };

  const handleSave = async () => {
    try {
      await axios.put(
        'http://localhost:5000/api/teaching-skills',
        { skills },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Skills saved successfully!');
    } catch (err) {
      console.error('Error saving skills:', err);
      toast.error('Failed to save skills.');
    }
  };

  return (
    <div className="skills-container">
      <h1 className="skills-heading">🧠 My Teaching Skills</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="skills-content">
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index} className="skill-item">{skill}</li>
            ))}
          </ul>

          <div className="input-group">
            <input
              className="skill-input"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
            />
            <button className="add-btn" onClick={handleAddSkill}>Add</button>
          </div>

          <div className="save-group">
            <button className="save-btn" onClick={handleSave}>💾 Save Skills</button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default TeachingSkills;
