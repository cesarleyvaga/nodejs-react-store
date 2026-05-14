const pool = require("../../config/db");

const getAll = async () => {
    const result = await pool.query("SELECT * FROM products ORDER BY name ASC");
    return result.rows;
};

const getById = async (id) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

const create = async ({ name, price, stock }) => {
    const result = await pool.query("INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
        [name, price, stock]
    );
    return result.rows[0];
};

const update = async (id, { name, price, stock }) => {
    const result = await pool.query("UPDATE products SET name = $2, price = $3, stock = $4 WHERE id = $1 RETURNING *",
        [id, name, price, stock]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}