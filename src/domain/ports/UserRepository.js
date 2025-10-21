class UserRepository {
  async findByEmail(email) {
    throw new Error('Method findByEmail must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  async save(user, userProfile) {
    throw new Error('Method save must be implemented');
  }

  async update(user) {
    throw new Error('Method update must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete must be implemented');
  }

  async existsByEmail(email) {
    throw new Error('Method existsByEmail must be implemented');
  }
}

module.exports = UserRepository;
