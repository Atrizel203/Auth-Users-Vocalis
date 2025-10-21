const db = require('../config/db');
const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();

const userModel = {
  findByEmail: async (email) => {
    const query = 'SELECT u.id, u.email, u.password_hash, u.role, p.full_name, p.age FROM users u JOIN user_profiles p ON u.id = p.user_id WHERE u.email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  },

  findById: async (id) => {
    const query = 'SELECT u.id, u.email, u.role, p.full_name, p.age, p.avatar_url, p.difficulty_level FROM users u JOIN user_profiles p ON u.id = p.user_id WHERE u.id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
  
  create: async ({ email, passwordHash, fullName, age }) => {
    const client = await db.pool.connect(); 
    try {
      await client.query('BEGIN');
      const userId = uuidv4();
      
      const userQuery = 'INSERT INTO users(id, email, password_hash) VALUES($1, $2, $3) RETURNING id, email, role';
      const userResult = await client.query(userQuery, [userId, email, passwordHash]);

      const profileQuery = 'INSERT INTO user_profiles(user_id, full_name, age) VALUES($1, $2, $3)';
      await client.query(profileQuery, [userId, fullName, age]);
      
      await client.query('COMMIT');
      return userResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = userModel;