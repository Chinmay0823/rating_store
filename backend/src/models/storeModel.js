const pool = require('../config/db.js');


const createStore = async ({ name, email, address, owner_id }) => {
  const res = await pool.query(
    'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, address, owner_id]
  );
  return res.rows[0];
};


const getAllStores = async () => {
  const res = await pool.query(`
    SELECT s.*, COALESCE(AVG(r.rating_value), 0)::numeric(2,1) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `);
  return res.rows;
};


const getStoreRatings = async (storeId) => {
  const res = await pool.query(`
    SELECT u.name, u.email, r.rating_value, r.updated_at
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    WHERE r.store_id = $1
  `, [storeId]);
  return res.rows;
};

module.exports = { createStore, getAllStores, getStoreRatings };
