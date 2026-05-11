import express from 'express';
import { issueBook, returnBook, getIssues } from '../controllers/issueController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/borrow', issueBook);
router.post('/return/:id', returnBook);
router.get('/', getIssues);

export default router;
