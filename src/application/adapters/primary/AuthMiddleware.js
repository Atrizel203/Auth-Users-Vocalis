const AppError = require('../../../utils/AppError');

class AuthMiddleware {
  constructor(tokenGenerator) {
    this.tokenGenerator = tokenGenerator;
  }

  verifyToken = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('No se proveyó un token de autenticación', 401));
      }

      const token = authHeader.split(' ')[1];
      const decoded = await this.tokenGenerator.verifyAccessToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return next(new AppError('Token inválido o expirado', 403));
    }
  };
}

module.exports = AuthMiddleware;
