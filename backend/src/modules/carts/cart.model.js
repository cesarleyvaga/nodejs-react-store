const pool = require("../../config/db");

const getByUserId = async (userId) => {
  const result = await pool.query(
    `
      SELECT id AS cart_id,
      user_id,
      created_at,
      updated_at
      FROM carts
      WHERE user_id = $1
    `,
    [userId],
  );
  return result.rows[0];
};

const getItems = async (cartId) => {
  const result = await pool.query(
    `
      SELECT ci.id AS cart_item_id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.price
      FROM cart_items AS ci
      JOIN products AS p
      ON ci.product_id = p.id
      WHERE ci.cart_id = $1
    `,
    [cartId],
  );
  return result.rows;
};

const getItem = async (cartId, productId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM cart_items
      WHERE cart_id = $1
      AND product_id = $2
    `,
    [cartId, productId],
  );
  return result.rows[0];
};

const create = async (userId) => {
  const result = await pool.query(
    `
      INSERT INTO carts (user_id)
      VALUES ($1)
      RETURNING *
    `,
    [userId],
  );
  return result.rows[0];
};

const addItem = async (cartId, productId, quantity) => {
  const result = await pool.query(
    `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (cart_id, product_id)
      DO UPDATE
      SET quantity = cart_items.quantity + EXCLUDED.quantity
      RETURNING *
    `,
    [cartId, productId, quantity],
  );
  return result.rows[0];
};

const decreaseItem = async (cartId, productId, quantity) => {
  const result = await pool.query(
    `
      UPDATE cart_items
      SET quantity = quantity - $3
      WHERE cart_id = $1
      AND product_id = $2
      RETURNING *
    `,
    [cartId, productId, quantity],
  );
  return result.rows[0];
};

const removeItem = async (cartId, productId) => {
  const result = await pool.query(
    `
      DELETE FROM cart_items
      WHERE cart_id = $1
      AND product_id = $2
      RETURNING id,
      cart_id,
      product_id,
      0 AS quantity
    `,
    [cartId, productId],
  );
  return result.rows[0];
};

module.exports = {
  getByUserId,
  getItems,
  getItem,
  create,
  addItem,
  decreaseItem,
  removeItem,
};
