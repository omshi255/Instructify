import mongoose from 'mongoose';

const teachingSkillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{ type: String, required: true }],
}, { timestamps: true });

export default mongoose.model('TeachingSkill', teachingSkillSchema);
