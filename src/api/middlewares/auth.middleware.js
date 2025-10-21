const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('No se proveyó un token de autenticación', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return next(new AppError('Token inválido o expirado', 403)); 
  }
};

module.exports = { verifyToken };