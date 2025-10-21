class PasswordHasher {
  async hash(password) {
    throw new Error('Method hash must be implemented');
  }

  async compare(password, hashedPassword) {
    throw new Error('Method compare must be implemented');
  }
}

module.exports = PasswordHasher;
