import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import issueRoutes from './routes/issues.js';
import studentRoutes from './routes/students.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import User from './models/User.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/students', studentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
      if (!adminExists) {
        await User.create({
          name: 'Administrator',
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: 'admin'
        });
        console.log('Default admin user created:', process.env.ADMIN_EMAIL);
      }
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
