const Product = require("../../models/Product");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findById(productId);
    if (product) return product;
    else {
      const err = new Error("Product Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
exports.productDelete = async (req, res, next) => {
  try {
    const productId = req.product._id;
    await Product.findByIdAndDelete({ _id: productId });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    const productId = req.product._id;
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
