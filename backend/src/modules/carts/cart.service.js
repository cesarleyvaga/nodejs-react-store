const cartModel = require("./cart.model");
const AppError = require("../../errors/AppError");

const getByUserId = async (userId) => {
  const cart = await cartModel.getByUserId(userId);

  if (!cart) {
    throw new AppError("No cart exists", 404);
  }

  return cart;
};

const getItems = (cartId) => {
  return cartModel.getItems(cartId);
};

const getItem = async (cartId, productId) => {
  const item = await cartModel.getItem(cartId, productId);

  if (!item) {
    throw new AppError("Item not found", 404);
  }

  return item;
};

const create = async (userId) => {
  const existingCart = await cartModel.getByUserId(userId);

  if (existingCart) {
    throw new AppError("The user cart already exists", 400);
  }

  return cartModel.create(userId);
};

const addItem = (cartId, productId) => {
  return cartModel.addItem(cartId, productId, 1);
};

const decreaseItem = async (cartId, productId) => {
  const item = await cartModel.getItem(cartId, productId);

  if (!item) {
    throw new AppError("Item not found", 404);
  }

  if (item.quantity === 1) {
    return cartModel.removeItem(cartId, productId);
  }

  return cartModel.decreaseItem(cartId, productId, 1);
};

const removeItem = async (cartId, productId) => {
  const item = await cartModel.removeItem(cartId, productId);

  if (!item) {
    throw new AppError("Item not found", 404);
  }

  return item;
};

module.exports = {
  getByUserId,
  getItems,
  getItem,
  create,
  addItem,
  decreaseItem,
  removeItem,
};
