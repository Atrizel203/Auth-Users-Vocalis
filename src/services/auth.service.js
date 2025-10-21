const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const AppError = require('../utils/AppError');

const authService = {
  register: async (userData) => {
    const { email, password, fullName, age } = userData;

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      throw new AppError('El email ya está en uso', 409); // 409 Conflict
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({ email, passwordHash, fullName, age });
    return { userId: newUser.id, email: newUser.email };
  },

  login: async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new AppError('Credenciales inválidas', 401); // 401 Unauthorized
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
    
    return { accessToken };
  },
};

module.exports = authService;