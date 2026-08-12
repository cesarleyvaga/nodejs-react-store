const productService = require("./products.service");

const getAllProducts = async (req, res, next) => {
  try {
    const data = await productService.getAllProducts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const data = await productService.getProductById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const data = await productService.createProduct(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const data = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const patchProduct = async (req, res, next) => {
  try {
    const data = await productService.patchProduct(req.params.id, req.body);
    res.status(201).json(data);
  } catch (error) {}
};

const deleteProduct = async (req, res, next) => {
  try {
    const data = await productService.deleteProduct(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
