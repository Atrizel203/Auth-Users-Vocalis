const User = require('../entities/User');
const UserProfile = require('../entities/UserProfile');
const AppError = require('../../utils/AppError');

class RegisterUserUseCase {
  constructor(userRepository, passwordHasher) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute({ email, password, fullName, age }) {
    if (!email || !password || !fullName || !age) {
      throw new AppError('Todos los campos son obligatorios', 400);
    }

    if (age < 0 || age > 150) {
      throw new AppError('La edad debe estar entre 0 y 150 años', 400);
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('El email ya está en uso', 409);
    }

    const passwordHash = await this.passwordHasher.hash(password);

    const user = User.createFromRegistration({ email, passwordHash });
    const userProfile = UserProfile.createFromRegistration({ 
      userId: null, 
      fullName, 
      age 
    });

    const savedUser = await this.userRepository.save(user, userProfile);

    return {
      userId: savedUser.id,
      email: savedUser.email,
      role: savedUser.role
    };
  }
}

module.exports = RegisterUserUseCase;
