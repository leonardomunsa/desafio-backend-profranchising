/* eslint-disable consistent-return */
/* eslint-disable no-console */
const {
  createProductService,
  getProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
  uploadImageProductService,
  getImageProductService,
} = require("../services/productsService");
const { created, success, noContent } = require("../utils/dictionary");

const getProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await getProductService(id);

    return res.status(success).json(product);
  } catch (error) {
    console.log(`GET PRODUCT -> ${error.message}`);
    next(error);
  }
};

const getProductsController = async (req, res, next) => {
  try {
    const products = await getProductsService();

    return res.status(success).json(products);
  } catch (error) {
    console.log(`GET PRODUCTS -> ${error.message}`);
    next(error);
  }
};

const createProductController = async (req, res, next) => {
  try {
    const { name, image, price, components } = req.body;

    const productCreated = await createProductService({
      name,
      image,
      price,
      components,
    });

    return res.status(created).json(productCreated);
  } catch (error) {
    console.log(`POST PRODUCT -> ${error.message}`);
    next(error);
  }
};

const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image, price, components } = req.body;

    await updateProductService(id, {
      name,
      image,
      price,
      components,
    });

    return res.status(success).json("Product updated");
  } catch (error) {
    console.log(`PUT PRODUCT -> ${error.message}`);
    next(error);
  }
};

const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteProductService(id);

    return res.status(noContent).json();
  } catch (error) {
    console.log(`DELETE PRODUCT -> ${error.message}`);
    next(error);
  }
};

const uploadImageProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;

    await uploadImageProductService(id, filename);

    return res.status(success).json("Image uploaded successfully");
  } catch (error) {
    console.log(`UPLOAD IMAGE -> ${error.message}`);
    next(error);
  }
};

const getImageProductController = async (req, res, next) => {
  try {
    const { img } = req.params;

    const image = await getImageProductService(img);

    return res.status(success).json(image);
  } catch (error) {
    console.log(`GET IMAGE -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  getProductController,
  getProductsController,
  createProductController,
  updateProductController,
  deleteProductController,
  uploadImageProductController,
  getImageProductController,
};
