import express from 'express';
import { getAllStudents, getStudentById, getMyProfile } from '../controllers/studentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/me', getMyProfile);
router.get('/', authorizeRoles('admin'), getAllStudents);
router.get('/:id', authorizeRoles('admin'), getStudentById);

export default router;
