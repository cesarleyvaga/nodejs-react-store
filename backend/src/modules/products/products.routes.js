const express = require("express");
const route = express.Router();
const controller = require("./products.controller");

route.get("/", controller.getAllProducts);
route.get("/:id", controller.getProductById);
route.post("/", controller.createProduct);
route.put("/:id", controller.updateProduct);
route.delete("/:id", controller.deleteProduct);

module.exports = route;
