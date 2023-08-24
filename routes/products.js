const express = require("express");
const multer = require("multer");
const ProductController = require("../controllers/Product");
const router = express.Router();


const almacenamiento = multer.diskStorage({
    destination:function (req, file, cb)  {
        cb(null, './imagenes/products/')
    },

    filename:function (req, file, cb) {
        cb(null, "product" + Date.now() + file.originalname);
    }
})

const subidas = multer({storage: almacenamiento})
  






router.post("/crear", ProductController.create); 
router.get("/articulos/:ultimos?", ProductController.toList);
router.get("/articulo/:id", ProductController.one);
router.delete("/articulo/:id", ProductController.delet);
router.put("/articulo/:id", ProductController.edit);
router.post("/subir-imagen/:id", [subidas.single("file0")], ProductController.upLoad);
router.get("/imagen/:fichero", ProductController.image);



module.exports = router; 