import Joi from 'joi';
import Book from '../models/Book.js';
import Issue from '../models/Issue.js';
import calculateFine from '../utils/calculateFine.js';

const borrowSchema = Joi.object({
  bookId: Joi.string().required(),
  studentId: Joi.string().optional()
});

const issueBook = async (req, res) => {
  const { error, value } = borrowSchema.validate(req.body, { abortEarly: false, allowUnknown: false });
  if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(', ') });

  const { bookId, studentId } = value;
  const student = req.user.role === 'admin' ? studentId : req.user._id;
  if (!student) return res.status(400).json({ message: 'Student id is required for administrators' });

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (book.copiesAvailable <= 0) return res.status(400).json({ message: 'No copies available for borrowing' });

  const existingIssue = await Issue.findOne({ book: bookId, student, status: 'borrowed' });
  if (existingIssue) {
    return res.status(400).json({ message: 'Student already has this book borrowed' });
  }

  const issueDate = new Date();
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 14);

  const issue = await Issue.create({ student, book: bookId, issueDate, dueDate });
  book.copiesAvailable -= 1;
  await book.save();

  res.status(201).json(issue);
};

const returnBook = async (req, res) => {
  const issue = await Issue.findById(req.params.id).populate('book');
  if (!issue) return res.status(404).json({ message: 'Issue record not found' });
  if (issue.status === 'returned') return res.status(400).json({ message: 'Book already returned' });

  if (req.user.role === 'student' && issue.student.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only return your own borrowed books' });
  }

  issue.returnDate = new Date();
  issue.fine = calculateFine(issue.dueDate, issue.returnDate);
  issue.status = 'returned';
  await issue.save();

  const book = await Book.findById(issue.book._id);
  book.copiesAvailable += 1;
  await book.save();

  res.json(issue);
};

const getIssues = async (req, res) => {
  const { status, studentId, bookId, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (studentId) filter.student = studentId;
  if (bookId) filter.book = bookId;

  if (req.user.role === 'student') {
    filter.student = req.user._id;
  }

  const issues = await Issue.find(filter)
    .populate('student', 'name email')
    .populate('book', 'title author isbn')
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ issueDate: -1 });
  const total = await Issue.countDocuments(filter);

  res.json({ total, page: Number(page), limit: Number(limit), data: issues });
};

export { issueBook, returnBook, getIssues };
