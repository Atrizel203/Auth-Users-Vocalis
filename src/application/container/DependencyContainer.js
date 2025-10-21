const UserRepository = require('../../domain/ports/UserRepository');
const PasswordHasher = require('../../domain/ports/PasswordHasher');
const TokenGenerator = require('../../domain/ports/TokenGenerator');

const RegisterUserUseCase = require('../../domain/usecases/RegisterUserUseCase');
const LoginUserUseCase = require('../../domain/usecases/LoginUserUseCase');
const GetUserProfileUseCase = require('../../domain/usecases/GetUserProfileUseCase');

const PostgreSQLUserRepository = require('../../infrastructure/repositories/PostgreSQLUserRepository');
const BcryptPasswordHasher = require('../../infrastructure/adapters/BcryptPasswordHasher');
const JWTTokenGenerator = require('../../infrastructure/adapters/JWTTokenGenerator');

const AuthController = require('../adapters/primary/AuthController');
const UserController = require('../adapters/primary/UserController');
const AuthMiddleware = require('../adapters/primary/AuthMiddleware');

class DependencyContainer {
  constructor() {
    this.instances = new Map();
  }

  register(name, factory) {
    this.instances.set(name, factory);
  }

  resolve(name) {
    const factory = this.instances.get(name);
    if (!factory) {
      throw new Error(`Dependency ${name} not found`);
    }
    return factory();
  }

  configure() {
    this.register('userRepository', () => new PostgreSQLUserRepository());
    this.register('passwordHasher', () => new BcryptPasswordHasher());
    this.register('tokenGenerator', () => new JWTTokenGenerator());

    this.register('registerUserUseCase', () => new RegisterUserUseCase(
      this.resolve('userRepository'),
      this.resolve('passwordHasher')
    ));

    this.register('loginUserUseCase', () => new LoginUserUseCase(
      this.resolve('userRepository'),
      this.resolve('passwordHasher'),
      this.resolve('tokenGenerator')
    ));

    this.register('getUserProfileUseCase', () => new GetUserProfileUseCase(
      this.resolve('userRepository')
    ));

    this.register('authController', () => new AuthController(
      this.resolve('registerUserUseCase'),
      this.resolve('loginUserUseCase')
    ));

    this.register('userController', () => new UserController(
      this.resolve('getUserProfileUseCase')
    ));

    this.register('authMiddleware', () => new AuthMiddleware(
      this.resolve('tokenGenerator')
    ));
  }
}

module.exports = DependencyContainer;
