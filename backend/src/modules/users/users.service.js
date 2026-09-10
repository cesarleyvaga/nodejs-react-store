const userModel = require("./users.model");
const AppError = require("../../errors/AppError");
const bcrypt = require("bcrypt");

const getAllUsers = () => {
  return userModel.getAll();
};

const getUserById = async (id) => {
  const user = await userModel.getById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const createUser = async (data) => {
  if (!data.first_name?.trim()) {
    throw new AppError("The first name is mandatory", 400);
  }

  if (!data.last_name?.trim()) {
    throw new AppError("The last name is mandatory", 400);
  }

  if (!data.email?.trim()) {
    throw new AppError("The email is mandatory", 400);
  }

  if (!data.password?.trim()) {
    throw new AppError("The password is mandatory", 400);
  }

  const password_hash = await bcrypt.hash(data.password, 10);

  const dataUser = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password_hash,
  };

  return userModel.create(dataUser);
};

const updateUser = async (id, data) => {
  const user = await userModel.getById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!data.first_name?.trim()) {
    throw new AppError("The first name is mandatory", 400);
  }

  if (!data.last_name?.trim()) {
    throw new AppError("The last name is mandatory", 400);
  }

  if (!data.email?.trim()) {
    throw new AppError("The email is mandatory", 400);
  }

  if (!data.password?.trim()) {
    throw new AppError("The password is mandatory", 400);
  }

  const password_hash = await bcrypt.hash(data.password, 10);

  const dataUser = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password_hash,
  };

  return userModel.update(id, dataUser);
};

const patchUser = async (id, data) => {
  const user = await userModel.getById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (data.first_name !== undefined && !data.first_name.trim()) {
    throw new AppError("The first name cannot be empty", 400);
  }

  if (data.last_name !== undefined && !data.last_name.trim()) {
    throw new AppError("The last name cannot be empty", 400);
  }

  if (data.email !== undefined && !data.email.trim()) {
    throw new AppError("The email cannot be empty", 400);
  }

  if (data.password !== undefined && !data.password.trim()) {
    throw new AppError("The password cannot be empty", 400);
  }

  let password_hash = user.password_hash;

  if (data.password !== undefined) {
    password_hash = await bcrypt.hash(data.password, 10);
  }

  const dataUser = {
    first_name: data.first_name ?? user.first_name,
    last_name: data.last_name ?? user.last_name,
    email: data.email ?? user.email,
    password_hash,
  };

  return userModel.update(id, dataUser);
};

const removeUser = async (id) => {
  const user = await userModel.getById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return userModel.remove(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  removeUser,
};
