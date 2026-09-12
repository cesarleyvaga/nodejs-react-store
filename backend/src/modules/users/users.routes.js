const express = require("express");
const route = express.Router();
const controller = require("./users.controller");

route.get("/", controller.getAllUsers);
route.get("/:id", controller.getUserById);
route.post("/", controller.createUser);
route.put("/:id", controller.updateUser);
route.patch("/:id", controller.patchUser);
route.delete("/:id", controller.removeUser);

module.exports = route;
