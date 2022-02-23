/* eslint-disable consistent-return */
/* eslint-disable no-console */
const {
  createProductService,
  getProductService,
  getProductsService,
} = require("../services/productsService");
const { created, success } = require("../utils/dictionary");

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

module.exports = {
  getProductController,
  getProductsController,
  createProductController,
};
