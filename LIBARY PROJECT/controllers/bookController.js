import Joi from 'joi';
import Book from '../models/Book.js';

const createBookSchema = Joi.object({
  title: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  isbn: Joi.string().trim().required(),
  category: Joi.string().trim().allow('').default('General'),
  publisher: Joi.string().trim().allow('').default('Unknown'),
  totalCopies: Joi.number().integer().min(0).required(),
  copiesAvailable: Joi.number().integer().min(0).optional()
});

const updateBookSchema = Joi.object({
  title: Joi.string().trim().optional(),
  author: Joi.string().trim().optional(),
  isbn: Joi.string().trim().optional(),
  category: Joi.string().trim().optional(),
  publisher: Joi.string().trim().optional(),
  totalCopies: Joi.number().integer().min(0).optional(),
  copiesAvailable: Joi.number().integer().min(0).optional()
});

const createBook = async (req, res) => {
  const { error, value } = createBookSchema.validate(req.body, { abortEarly: false, allowUnknown: false });
  if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(', ') });

  if (await Book.findOne({ isbn: value.isbn })) {
    return res.status(400).json({ message: 'Book with this ISBN already exists' });
  }

  const book = new Book({ ...value, copiesAvailable: value.copiesAvailable ?? value.totalCopies });
  await book.save();
  res.status(201).json(book);
};

const getBooks = async (req, res) => {
  const { search, author, category, available, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: new RegExp(search, 'i') },
      { author: new RegExp(search, 'i') },
      { isbn: new RegExp(search, 'i') }
    ];
  }
  if (author) filter.author = new RegExp(author, 'i');
  if (category) filter.category = new RegExp(category, 'i');
  if (available === 'true') filter.copiesAvailable = { $gt: 0 };

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ title: 1 });
  const total = await Book.countDocuments(filter);

  res.json({ total, page: Number(page), limit: Number(limit), data: books });
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

const updateBook = async (req, res) => {
  const { error, value } = updateBookSchema.validate(req.body, { abortEarly: false, allowUnknown: false });
  if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(', ') });

  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  Object.assign(book, value);
  if (value.totalCopies != null && value.copiesAvailable == null) {
    book.copiesAvailable = Math.max(0, book.copiesAvailable + (value.totalCopies - book.totalCopies));
  }

  await book.save();
  res.json(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  await book.deleteOne();
  res.json({ message: 'Book deleted' });
};

export { createBook, getBooks, getBookById, updateBook, deleteBook };
