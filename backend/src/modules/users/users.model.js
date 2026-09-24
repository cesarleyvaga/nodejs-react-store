const pool = require("../../config/db");

const getAll = async () => {
  const result = await pool.query(
    "SELECT id, first_name, last_name, email, phone_number, username FROM users ORDER BY last_name ASC",
  );
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    "SELECT id, first_name, last_name, email, phone_number, username FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

const getEmail = async (email) => {
  const result = await pool.query("SELECT email FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const getPasswordHash = async (id) => {
  const result = await pool.query(
    "SELECT password_hash FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

const create = async ({
  first_name,
  last_name,
  email,
  password_hash,
  phone_number,
  username,
}) => {
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password_hash, phone_number, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, phone_number, username",
    [first_name, last_name, email, password_hash, phone_number, username],
  );
  return result.rows[0];
};

const update = async (
  id,
  { first_name, last_name, email, password_hash, phone_number, username },
) => {
  const result = await pool.query(
    "UPDATE users SET first_name = $2, last_name = $3, email = $4, password_hash = $5, phone_number = $6, username = $7 WHERE id = $1 RETURNING id, first_name, last_name, email, phone_number, username",
    [id, first_name, last_name, email, password_hash, phone_number, username],
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id, first_name, last_name, email, phone_number, username",
    [id],
  );
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  getEmail,
  getPasswordHash,
  create,
  update,
  remove,
};
