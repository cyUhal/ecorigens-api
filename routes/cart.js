const express = require("express");
const router = express.Router();
const cartController  = ("../controllers/Cart.js")









router.get("/product", cartController.getProducts);
router.get("/product-cart", cartController.getProductsCart)
router.post("/products-cart", cartController.addProductCart);
router.put("/products-cart/: productId",cartController.putProduct)
router.delete("/products-cart/: productId", cartController.deleteProduct)





module.exports = router; 