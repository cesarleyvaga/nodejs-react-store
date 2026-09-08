const pool = require("../../config/db");

const getAll = async () => {
  const result = await pool.query(
    "SELECT id, first_name, last_name, email FROM users ORDER BY last_name ASC",
  );
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

const create = async ({ first_name, last_name, email, password_hash }) => {
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
    [first_name, last_name, email, password_hash],
  );
  return result.rows[0];
};

const update = async (id, { first_name, last_name, email, password_hash }) => {
  const result = await pool.query(
    "UPDATE users SET first_name = $2, last_name = $3, email = $4, password_hash = $5 WHERE id = $1 RETURNING id, first_name, last_name, email",
    [id, first_name, last_name, email, password_hash],
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id, first_name, last_name, email",
    [id],
  );
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
