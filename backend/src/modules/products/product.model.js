const pool = require("../../config/db");

const getAll = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    ORDER BY name ASC`,
  );
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE id = $1`,
    [id],
  );
  return result.rows[0];
};

const create = async ({
  name,
  description,
  price,
  currency_code,
  stock,
  sku,
}) => {
  const result = await pool.query(
    `
    INSERT INTO products (name, description, price, currency_code, stock, sku)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [name, description, price, currency_code, stock, sku],
  );
  return result.rows[0];
};

const update = async (
  id,
  { name, description, price, currency_code, stock, sku, active },
) => {
  const result = await pool.query(
    `
    UPDATE products
    SET name = $2, description = $3, price = $4, currency_code = $5, stock = $6, sku = $7, active = $8
    WHERE id = $1
    RETURNING *`,
    [id, name, description, price, currency_code, stock, sku, active],
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM products
    WHERE id = $1
    RETURNING *`,
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
