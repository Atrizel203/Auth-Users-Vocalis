const userModel = require('../models/user.model');
const AppError = require('../utils/AppError');

const userService = {
  getProfile: async (userId) => {
    const profile = await userModel.findById(userId);
    if (!profile) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return profile;
  },
};

module.exports = userService;