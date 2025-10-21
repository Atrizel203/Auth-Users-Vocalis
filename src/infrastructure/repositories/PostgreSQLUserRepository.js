const UserRepository = require('../../domain/ports/UserRepository');
const User = require('../../domain/entities/User');
const UserProfile = require('../../domain/entities/UserProfile');
const db = require('../database/db');

class PostgreSQLUserRepository extends UserRepository {
  async findByEmail(email) {
    const query = `
      SELECT u.id, u.email, u.password_hash, u.role, u.created_at, u.updated_at,
             p.full_name, p.age, p.avatar_url, p.difficulty_level
      FROM users u 
      LEFT JOIN user_profiles p ON u.id = p.user_id 
      WHERE u.email = $1
    `;
    const { rows } = await db.query(query, [email]);
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new User({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      fullName: row.full_name,
      age: row.age,
      avatarUrl: row.avatar_url,
      difficultyLevel: row.difficulty_level
    });
  }

  async findById(id) {
    const query = `
      SELECT u.id, u.email, u.password_hash, u.role, u.created_at, u.updated_at,
             p.full_name, p.age, p.avatar_url, p.difficulty_level
      FROM users u 
      LEFT JOIN user_profiles p ON u.id = p.user_id 
      WHERE u.id = $1
    `;
    const { rows } = await db.query(query, [id]);
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new User({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      fullName: row.full_name,
      age: row.age,
      avatarUrl: row.avatar_url,
      difficultyLevel: row.difficulty_level
    });
  }

  async save(user, userProfile) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      
      const userQuery = `
        INSERT INTO users(id, email, password_hash, role, created_at, updated_at) 
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING id, email, role, created_at, updated_at
      `;
      const userResult = await client.query(userQuery, [
        user.id || require('crypto').randomUUID(),
        user.email,
        user.passwordHash,
        user.role,
        user.createdAt,
        user.updatedAt
      ]);

      const savedUser = userResult.rows[0];

      const profileQuery = `
        INSERT INTO user_profiles(user_id, full_name, age, avatar_url, difficulty_level, created_at, updated_at) 
        VALUES($1, $2, $3, $4, $5, $6, $7)
      `;
      await client.query(profileQuery, [
        savedUser.id,
        userProfile.fullName,
        userProfile.age,
        userProfile.avatarUrl,
        userProfile.difficultyLevel,
        userProfile.createdAt,
        userProfile.updatedAt
      ]);

      await client.query('COMMIT');
      
      return new User({
        id: savedUser.id,
        email: savedUser.email,
        passwordHash: user.passwordHash,
        role: savedUser.role,
        createdAt: savedUser.created_at,
        updatedAt: savedUser.updated_at
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async update(user) {
    const query = `
      UPDATE users 
      SET email = $2, password_hash = $3, role = $4, updated_at = $5 
      WHERE id = $1 
      RETURNING id, email, role, created_at, updated_at
    `;
    const { rows } = await db.query(query, [
      user.id,
      user.email,
      user.passwordHash,
      user.role,
      user.updatedAt
    ]);

    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new User({
      id: row.id,
      email: row.email,
      passwordHash: user.passwordHash,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }

  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rowCount > 0;
  }

  async existsByEmail(email) {
    const query = 'SELECT 1 FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows.length > 0;
  }
}

module.exports = PostgreSQLUserRepository;
