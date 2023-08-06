
const express = require ("express");
const ProductsController = require('../controllers/Product')
const routes = express.Router()
const multer = require("multer");



const storage = multer.diskStorage({
    destination:function (req, file, cb)  {
        cb(null, './images/products')
    },

    filename:function (req, file, cb) {
        cb(null, "products" + Date.now() + file.originalname);
    }
})

const uploads = multer({storage: storage}) 
  


routes.post('/create', ProductsController.create);
routes.get('/products/:last?', ProductsController.toList);
routes.get('/product/:id', ProductsController.one);
routes.delete('/product/:id', ProductsController.delet);
routes.put('/product/:id', ProductsController.edit);
routes.post("/upload_img/:id", [uploads.single("file0")], ProductsController.upLoad);
routes.get("/image/:file", ProductsController.image);





module.exports= routes;