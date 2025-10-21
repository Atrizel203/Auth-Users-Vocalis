const AppError = require('../../utils/AppError');

class LoginUserUseCase {
  constructor(userRepository, passwordHasher, tokenGenerator) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError('Email y contraseña son obligatorios', 400);
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const isPasswordValid = await this.passwordHasher.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const payload = { 
      userId: user.id, 
      role: user.role 
    };
    const accessToken = await this.tokenGenerator.generateAccessToken(payload);

    return { accessToken };
  }
}

module.exports = LoginUserUseCase;
