// routes/activity.js
import express from 'express';
import { trackActivity } from '../controllers/activityController.js';

const router = express.Router();

// Track User Activity with YouTube Links
router.post('/track-activity', trackActivity);

export default router;
