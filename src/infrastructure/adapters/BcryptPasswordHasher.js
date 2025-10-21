const PasswordHasher = require('../../domain/ports/PasswordHasher');
const bcrypt = require('bcryptjs');

class BcryptPasswordHasher extends PasswordHasher {
  async hash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = BcryptPasswordHasher;
