const TokenGenerator = require('../../domain/ports/TokenGenerator');
const jwt = require('jsonwebtoken');

class JWTTokenGenerator extends TokenGenerator {
  async generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JWTTokenGenerator;
