
const Article = require('../models/Article')
const path = require('path')
const fs = require('fs');



const create = (req, res) => {

    let params = req.body;

    

    const article = new Article(params)

    article.save((error, articleSave) => {
        if (error || !articleSave) {
            return res.status(400).json({
                staus: 'error',
                messge: 'Article could not be saved'
            })
        }

        return res.status(200).json({
            staus: 'success',
            message: 'Article created successfully'
        })

    })
}

const toList = (req, res) => {
    let consultation = Article.find({});

    if (req.params.last) {
        consultation.limit(3);
    }

    consultation.sort({ fecha: -1 })
        .exec((error, articles) => {
            if (error || !articles) {
                return res.status(404).json({
                    status: "error",
                    message: "No articles found!!"
                });
            }
            return res.status(200).send({
                status: "success",
                counter: articles.length,
                articles
            });
        });
}

const one = (req, res) => {

    let id = req.params.id;

    Article.findById(id, (error, article) => {
        if (error || !article) {
            return res.status(404).json({
                status: 'error',
                message: 'No article found!!'
            });

        }

        return res.status(200).send({
            status: 'success',
            article
        });

    });
}

const delet = (req, res) => {
    let articleId = req.params.id
    Article.findByIdAndDelete({ _id: articleId }, (error, articleDelete) => {
        if (error || !articleDelete) {
            return res.status(404).json({
                status: 'error',
                message: 'Error delete article!!'
            });
        }

        return res.status(200).send({
            status: 'succes',
            article: articleDelete,
            message: 'Article deleted successfully'
        })
    })
}

const edit = (req, res) => {
    let articleId = req.params.id

    

    Article.findOneAndUpdate({ _id: articleId }, req.body, { new: true }, (error, updatedArticle) => {
        if (error || !updatedArticle) {
            return res.status(404).json({
                status: 'error',
                message: 'Error update article!!'
            });
        }
        return res.status(200).send({
            status: 'succes',
            article: updatedArticle,
            message: 'Article updated successfully'
        })

    })
}


const upLoad = (req, res) => {


    if (!req.file && !req.files) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request'
        })
    }

    let archive = req.file.originalname;
    let archive_split = archive.split("\.");
    let extension = archive_split[1];
   
    if (extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif') {
        
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid archive'
            })
        })
    } else {

        
        let articleId = req.params.id;

        
        Article.findOneAndUpdate({ _id: articleId }, { image: req.file.filename }, { new: true }, (error, updatedArticle) => {

            if (error || !updatedArticle) {
                return res.status(500).json({
                    status: "error",
                    message: "Failed to update"
                });
            }

            
            return res.status(200).json({
                status: "success",
                article: updatedArticle,
                file: req.file
            })
        });

    }

}

const image = (req, res) => {
    let file = req.params.file;
    let physical_route = "../images/articles" + file;

    fs.stat(physical_route, (error, exists) => {
        if (exists) {
            return res.sendFile(path.resolve(physical_route))
        } else {
            return res.status(404).json({
                status: "error",
                message: "The image does not exist"
            });
        }
    })
}

const search = (req, res) => {

    let searchs = req.params.search
    
    Article.find({
        '$or': [
            { 'title': { '$regex': searchs, '$options': 'i' } },
            { 'title': { '$regex': searchs, '$options': 'i' } }
        ]
    })

        .sort({ date: -1 })
        .exec((error, foundArticles) => {
            if (error || !foundArticles ||foundArticles.length <= 0) {
                return res.status(404).json({
                    status: 'error',
                    mensaje: 'No article found'
                });
            }

            return res.status(200).json({
                status: 'success',
                articulos: foundArticles
            })
        })

}


module.exports = {
    create,
    toList,
    one,
    delet,
    edit,
    upLoad,
    image,
    search

}