import TeachingSkill from '../models/TeachingSkill.js';

export const getTeachingSkills = async (req, res) => {
  const skills = await TeachingSkill.findOne({ user: req.user.id });
  res.json(skills || { skills: [] });
};

export const updateTeachingSkills = async (req, res) => {
  const { skills } = req.body;
  const updated = await TeachingSkill.findOneAndUpdate(
    { user: req.user.id },
    { skills },
    { new: true, upsert: true }
  );
  res.json(updated);
};
