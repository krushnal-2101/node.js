import jwt from 'jsonwebtoken';

 const verifyToken = (req, res, next) => {
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

 const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (Array.isArray(role)) {
    if (!role.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  } else {
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};


export{ verifyToken, requireRole };