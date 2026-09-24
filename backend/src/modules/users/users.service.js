const userModel = require("./users.model");
const AppError = require("../../errors/AppError");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  return await userModel.getAll();
};

const getUserById = async (id) => {
  const user = await userModel.getById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const getPasswordHash = async (id) => {
  const userPasswordHash = await userModel.getPasswordHash(id);

  if (!userPasswordHash) {
    throw new AppError("User not found", 404);
  }

  return userPasswordHash;
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

  if (!data.phone_number?.trim()) {
    throw new AppError("The phone number is mandatory", 400);
  }

  if (!data.username?.trim()) {
    throw new AppError("The username is mandatory", 400);
  }

  const email = await userModel.getEmail(data.email);

  if (email) {
    throw new AppError("The email has been regitered, enter a new one", 400);
  }

  const password_hash = await bcrypt.hash(data.password, 10);

  const dataUser = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password_hash,
    phone_number: data.phone_number,
    username: data.username,
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

  if (!data.phone_number?.trim()) {
    throw new AppError("The phone_number is mandatory", 400);
  }

  if (!data.username?.trim()) {
    throw new AppError("The username is mandatory", 400);
  }

  const password_hash = await bcrypt.hash(data.password, 10);

  const dataUser = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password_hash,
    phone_number: data.phone_number,
    username: data.username,
  };

  return userModel.update(id, dataUser);
};

const patchUser = async (id, data) => {
  const user = await userModel.getById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const userPasswordHash = await userModel.getPasswordHash(id);

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

  if (data.phone_number !== undefined && !data.phone_number.trim()) {
    throw new AppError("The phone number is mandatory", 400);
  }

  if (data.username !== undefined && !data.username.trim()) {
    throw new AppError("The username is mandatory", 400);
  }

  let password_hash = userPasswordHash.password_hash;

  if (data.password !== undefined) {
    password_hash = await bcrypt.hash(data.password, 10);
  }

  const dataUser = {
    first_name: data.first_name ?? user.first_name,
    last_name: data.last_name ?? user.last_name,
    email: data.email ?? user.email,
    password_hash,
    phone_number: data.phone_number ?? user.phone_number,
    username: data.username ?? user.username,
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
  getPasswordHash,
  createUser,
  updateUser,
  patchUser,
  removeUser,
};
