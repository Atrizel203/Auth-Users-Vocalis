class TokenGenerator {
  async generateAccessToken(payload) {
    throw new Error('Method generateAccessToken must be implemented');
  }

  async verifyAccessToken(token) {
    throw new Error('Method verifyAccessToken must be implemented');
  }
}

module.exports = TokenGenerator;
