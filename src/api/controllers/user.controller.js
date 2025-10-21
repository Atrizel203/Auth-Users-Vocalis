// Fichero: src/api/controllers/user.controller.js
const userService = require('../../services/user.service');

const userController = {
  getProfile: async (req, res, next) => {
    try {
      // El userId viene del token decodificado por el middleware de autenticación
      const userId = req.user.userId;
      const profile = await userService.getProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;