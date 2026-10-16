const express = require("express");
const route = express.Router();
const controller = require("./cart.controller");

route.get("/user/:userId", controller.getByUserId);
route.get("/:cartId", controller.getItems);
route.get("/:cartId/item/:productId", controller.getItem);
route.post("/user/:userId", controller.create);
route.patch("/:cartId/add-item/:productId", controller.addItem);
route.patch("/:cartId/decrease-item/:productId", controller.decreaseItem);
route.delete("/:cartId/item/:productId", controller.removeItem);

module.exports = route;
