const Product = require("../../models/Product");

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
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);
    if (foundProduct) {
      foundProduct.remove();
      return res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
      const err = new Error("Product Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let foundProduct = await Product.findById(productId);
    if (foundProduct) {
      foundProduct = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
      });
      return res.json(foundProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
      const err = new Error("Product Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
