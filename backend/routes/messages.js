import express from 'express';
import { sendMessage, getChatHistory } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Send Message
router.post('/send', verifyToken, sendMessage);

// Get Chat History
router.get('/chat/:receiverId', verifyToken, getChatHistory);

export default router;
