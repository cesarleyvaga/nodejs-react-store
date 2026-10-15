const cartService = require("./cart.service");

const getByUserId = async (req, res, next) => {
  try {
    const data = await cartService.getByUserId(req.params.userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getItems = async (req, res, next) => {
  try {
    const data = await cartService.getItems(req.params.cartId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getItem = async (req, res, next) => {
  try {
    const data = await cartService.getItem(
      req.params.cartId,
      req.params.productId,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = await cartService.create(req.params.userId);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const data = await cartService.addItem(
      req.params.cartId,
      req.params.productId,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const decreaseItem = async (req, res, next) => {
  try {
    const data = await cartService.decreaseItem(
      req.params.cartId,
      req.params.productId,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const data = await cartService.removeItem(
      req.params.cartId,
      req.params.productId,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
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
