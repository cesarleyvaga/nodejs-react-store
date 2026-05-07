const { Pool } = require("pg");
const env = require("./env");
const pool = new Pool(env.db);

pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error in database"));

module.exports = pool;
