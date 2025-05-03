const pool = require('../config/db.js');


const upsertRating = async (user_id, store_id, rating_value) => {
  const res = await pool.query(`
    INSERT INTO ratings (user_id, store_id, rating_value)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, store_id)
    DO UPDATE SET rating_value = $3, updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `, [user_id, store_id, rating_value]);
  return res.rows[0];
};


const getUserRating = async (user_id, store_id) => {
  const res = await pool.query(
    'SELECT rating_value FROM ratings WHERE user_id = $1 AND store_id = $2',
    [user_id, store_id]
  );
  return res.rows[0];
};

module.exports = { upsertRating, getUserRating };
