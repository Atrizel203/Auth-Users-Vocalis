class UserController {
  constructor(getUserProfileUseCase) {
    this.getUserProfileUseCase = getUserProfileUseCase;
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.userId;
      
      const profile = await this.getUserProfileUseCase.execute(userId);
      
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
