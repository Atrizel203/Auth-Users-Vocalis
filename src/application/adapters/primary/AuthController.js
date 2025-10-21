class AuthController {
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  async register(req, res, next) {
    try {
      const { email, password, fullName, age } = req.body;
      
      const newUser = await this.registerUserUseCase.execute({
        email,
        password,
        fullName,
        age
      });

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      const data = await this.loginUserUseCase.execute({
        email,
        password
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
