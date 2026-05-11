import express from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', protect, authorizeRoles('admin'), createBook);
router.put('/:id', protect, authorizeRoles('admin'), updateBook);
router.delete('/:id', protect, authorizeRoles('admin'), deleteBook);

export default router;
