const authService = require('../../services/auth.service');

const authController = {
  register: async (req, res, next) => {
    try {
      const newUser = await authService.register(req.body);
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: newUser,
      });
    } catch (error) {
      next(error); 
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;