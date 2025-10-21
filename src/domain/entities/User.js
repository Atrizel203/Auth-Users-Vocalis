class User {
  constructor({ id, email, passwordHash, role = 'user', createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  hasRole(role) {
    return this.role === role;
  }

  static createFromRegistration({ email, passwordHash, role = 'user' }) {
    return new User({
      id: null, 
      email,
      passwordHash,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  toPublicObject() {
    const { passwordHash, ...publicUser } = this;
    return publicUser;
  }
}

module.exports = User;
