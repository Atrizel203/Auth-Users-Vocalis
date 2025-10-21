const AppError = require('../../utils/AppError');

class GetUserProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new AppError('ID de usuario es obligatorio', 400);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      age: user.age,
      avatarUrl: user.avatarUrl,
      difficultyLevel: user.difficultyLevel,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}

module.exports = GetUserProfileUseCase;
