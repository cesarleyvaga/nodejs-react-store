const productModel = require("./products.model");
const AppError = require("../../errors/AppError");

const getAllProducts = async () => {
  return productModel.getAll();
};

const getProductById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const createProduct = async (data) => {
  if (!data.name) {
    throw new AppError("The name is mandatory", 400);
  }

  if (!data.price) {
    throw new AppError("The price is mandatory", 400);
  }

  if (!data.stock) {
    throw new AppError("The stock is mandatory", 400);
  }

  return await productModel.create(data);
};

const updateProduct = async (id, data) => {
  const existingProduct = await productModel.getProductById();

  if (!existingProduct) {
    throw new AppError("Product not found", 404);
  }

  if (data.name === undefined) {
    throw new AppError("The name is mandatory", 400);
  }

  if (data.price === undefined) {
    throw new AppError("The price is mandatory", 400);
  }

  if (data.stock === undefined) {
    throw new AppError("The stock is mandatory", 400);
  }

  return await productModel.update(id, {
    name: data.name,
    price: data.price,
    stock: data.stock,
  });
};

const patchProduct = async (id, data) => {
  const existingProduct = await productModel.getById(id);

  if (!existingProduct) {
    throw new AppError("Product not found", 404);
  }

  const updatedData = {
    name: data.name ?? existingProduct.name,
    price: data.price ?? existingProduct.price,
    stock: data.stock ?? existingProduct.stock,
  };

  return await productModel.update(id, updatedData);
};

const deleteProduct = async (id) => {
  const product = await productModel.remove(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
