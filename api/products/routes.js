const express = require("express");

const {
  getProducts,
  productCreate,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("./controllers");

const router = express.Router();

// Middleware
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  req.product = product;
  next();
});

router.get("/", getProducts);
router.post("/", productCreate);
router.delete("/:productId", productDelete);
router.put("/:productId", productUpdate);

module.exports = router;
