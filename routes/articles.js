const express = require ("express");
const ArticleController = require('../controllers/Article')
const routes = express.Router()
const multer = require("multer");



const storage = multer.diskStorage({
    destination:function (req, file, cb)  {
        cb(null, './images/articles')
    },

    filename:function (req, file, cb) {
        cb(null, "articles" + Date.now() + file.originalname);
    }
})

const uploads = multer({storage: storage}) 
  


routes.post('/create', ArticleController.create);
routes.get('/articles/:last?', ArticleController.toList);
routes.get('/article/:id', ArticleController.one);
routes.delete('/article/:id', ArticleController.delet);
routes.put('/article/:id', ArticleController.edit);
routes.post("/upload_img/:id", [uploads.single("file0")], ArticleController.upLoad);
routes.get("/image/:file", ArticleController.image);





module.exports= routes;