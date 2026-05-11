import User from '../models/User.js';
import Issue from '../models/Issue.js';

const getAllStudents = async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password').sort({ name: 1 });
  res.json(students);
};

const getStudentById = async (req, res) => {
  const student = await User.findById(req.params.id).select('-password');
  if (!student || student.role !== 'student') {
    return res.status(404).json({ message: 'Student not found' });
  }

  const history = await Issue.find({ student: student._id })
    .populate('book', 'title author isbn')
    .sort({ issueDate: -1 });

  res.json({ student, history });
};

const getMyProfile = async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only student profiles can be retrieved here' });
  }

  const history = await Issue.find({ student: req.user._id })
    .populate('book', 'title author isbn')
    .sort({ issueDate: -1 });

  res.json({ student: req.user, history });
};

export { getAllStudents, getStudentById, getMyProfile };
