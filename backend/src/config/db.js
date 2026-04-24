const { Pool } = require("pg");
const { DB } = require("./env");

const pool = new Pool(DB);

pool.on("connect", () => {
    console.log("Conexión con PostgreSQL: Conectado");
});

pool.on("error", (err) => {
    console.error("Conexión con PostgreSQL: Error");
});

module.exports = pool;