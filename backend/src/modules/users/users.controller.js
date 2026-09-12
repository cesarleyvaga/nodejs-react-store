const userService = require("./users.service");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const data = await userService.getUserById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = await userService.createUser(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const data = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const patchUser = async (req, res, next) => {
  try {
    const data = await userService.patchUser(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const data = await userService.removeUser(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  removeUser,
};
