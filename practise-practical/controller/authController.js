import jwt from 'jsonwebtoken';
import { error } from 'node:console';
import { use } from 'react';


const signToken = (user) => {
const payload = { id:user._id,  username: user.username, role: user.role};
 return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

 const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ username, password, role });
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const matched = await user.comparePassword(password);
    if (!matched) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    res.json({ message: 'Logged in', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

 const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

 const me = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(req.user.id).select('-password').populate('products');
  res.json(user);
};



export { register, login, logout, me };