import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const user = { id: 1, username: 'exampleuser' };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error('Error al verificar token:', err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = user; 
    next();
  });
};

export default authenticateToken;
