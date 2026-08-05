const express = require("express");
const cors = require("cors");
const productRoutes = require("./modules/products/products.index");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

module.exports = app;
