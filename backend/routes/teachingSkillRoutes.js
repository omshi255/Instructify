import express from 'express';
import { getTeachingSkills, updateTeachingSkills } from '../controllers/teachingSkillController.js';
import { protect } from '../middleware/Authmiddleware.js';

const router = express.Router();

router.get('/', protect, getTeachingSkills);
router.put('/', protect, updateTeachingSkills);

export default router;
