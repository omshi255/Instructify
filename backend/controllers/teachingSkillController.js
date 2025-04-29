import TeachingSkill from '../models/TeachingSkill.js';

// ✅ Create or Append Teaching Skills
export const createTeachingSkill = async (req, res) => {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({ message: 'Skills must be an array' });
  }

  try {
    const existing = await TeachingSkill.findOne({ user: req.user.id });

    if (existing) {
      // ✅ Already document exists → Append new skills without duplicates
      const allSkills = [...existing.skills, ...skills];
      // Remove duplicates (case insensitive)
      const uniqueSkills = Array.from(new Set(allSkills.map(skill => skill.toLowerCase())));

      existing.skills = uniqueSkills;
      await existing.save();

      return res.status(200).json({ message: 'Skills updated successfully', skills: existing.skills });
    }

    // ✅ No document found → Create new document
    const newSkills = new TeachingSkill({
      user: req.user.id,
      skills,
    });

    await newSkills.save();
    res.status(201).json({ message: 'Skills created successfully', skills: newSkills.skills });
  } catch (err) {
    console.error('Create skill error:', err);
    res.status(500).json({ message: 'Server error while creating skills' });
  }
};

// ✅ Read all TeachingSkills for the logged in user
export const getTeachingSkills = async (req, res) => {
  try {
    const skills = await TeachingSkill.findOne({ user: req.user.id });
    res.json(skills || { skills: [] });
  } catch (err) {
    console.error('Get skills error:', err);
    res.status(500).json({ message: 'Server error while fetching skills' });
  }
};

// ✅ Update all TeachingSkills (Replace existing skills array)
export const updateTeachingSkills = async (req, res) => {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({ message: 'Skills must be an array' });
  }

  try {
    const updated = await TeachingSkill.findOneAndUpdate(
      { user: req.user.id },
      { skills },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Update skills error:', err);
    res.status(500).json({ message: 'Server error while updating skills' });
  }
};

// ✅ Delete a specific skill from the array
export const deleteTeachingSkill = async (req, res) => {
  const { skill } = req.body;

  if (!skill || typeof skill !== 'string') {
    return res.status(400).json({ message: 'Invalid skill to delete' });
  }

  try {
    const userSkills = await TeachingSkill.findOne({ user: req.user.id });

    if (!userSkills) {
      return res.status(404).json({ message: 'No teaching skills found for this user' });
    }

    userSkills.skills = userSkills.skills.filter(
      (s) => s.toLowerCase() !== skill.toLowerCase()
    );

    await userSkills.save();

    res.status(200).json({ message: 'Skill deleted successfully', skills: userSkills.skills });
  } catch (err) {
    console.error('Delete skill error:', err);
    res.status(500).json({ message: 'Server error while deleting skill' });
  }
};

// ✅ Delete entire TeachingSkill document (all skills of user)
export const deleteAllTeachingSkills = async (req, res) => {
  try {
    const result = await TeachingSkill.findOneAndDelete({ user: req.user.id });

    if (!result) {
      return res.status(404).json({ message: 'No skills found to delete' });
    }

    res.status(200).json({ message: 'All teaching skills deleted successfully' });
  } catch (err) {
    console.error('Delete all skills error:', err);
    res.status(500).json({ message: 'Server error while deleting all skills' });
  }
};
