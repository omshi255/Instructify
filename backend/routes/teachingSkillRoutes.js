import express from 'express';
import {
  createTeachingSkill,
  getTeachingSkills,
  updateTeachingSkills,
  deleteTeachingSkill,
  deleteAllTeachingSkills
} from '../controllers/teachingSkillController.js';
import { protect } from '../middleware/Authmiddleware.js';

const router = express.Router();

router.post('/', protect, createTeachingSkill); // Create
router.get('/', protect, getTeachingSkills);    // Read
router.put('/', protect, updateTeachingSkills); // Update
router.patch('/delete-skill', protect, deleteTeachingSkill);
router.delete('/all', protect, deleteAllTeachingSkills); // Delete All Skills

export default router;
