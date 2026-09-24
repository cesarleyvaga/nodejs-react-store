const express = require("express");
const cors = require("cors");
const productRoutes = require("./modules/products/products.index");
const userRoutes = require("./modules/users/users.index");
const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
