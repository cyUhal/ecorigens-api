const express = require("express");
const router = express.Router();
const cartController  = require("../controllers/Cart")









router.get("/product", cartController.getProducts);
router.get("/product-cart", cartController.getProductsCart)
router.post("/products-cart", cartController.addProductCart);
router.put("/products-cart/: productId",cartController.putProduct)
router.delete("/products-cart/: productId", cartController.deleteProduct)





module.exports = router; 