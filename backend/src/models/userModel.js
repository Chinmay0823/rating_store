const pool = require('../config/db.js');


const createUser = async ({ name, email, password_hash, address, role }) => {
  try {
    const res = await pool.query(
      'INSERT INTO users (name, email, password_hash, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, password_hash, address, role]
    );
    return res.rows[0];
  } catch (err) {
    console.error('Error creating user:', err.message); 
    throw new Error('Error creating user');
  }
};


const findUserByEmail = async (email) => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0]; 
  } catch (err) {
    console.error('Error finding user by email:', err.message); 
    throw new Error('Error finding user');
  }
};

module.exports = { createUser, findUserByEmail };
