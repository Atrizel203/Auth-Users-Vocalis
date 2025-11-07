class User {
  constructor({ id, email, passwordHash, role = 'user', isActive = true, lastLoginAt = null, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.isActive = isActive;
    this.lastLoginAt = lastLoginAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  hasRole(role) {
    return this.role === role;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  updateLastLogin() {
    this.lastLoginAt = new Date();
  }

  static createFromRegistration({ email, passwordHash, role = 'user' }) {
    return new User({
      id: null,
      email,
      passwordHash,
      role,
      isActive: true,
      lastLoginAt: null,
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
