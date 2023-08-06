const Product = require('../models/Product')
const path = require('path')
const fs = require('fs');



const create = (req, res) => {

    let params = req.body;

    

    const product = new Product(params)

    product.save((error, productSave) => {
        if (error || !productSave) {
            return res.status(400).json({
                staus: 'error',
                messge: 'Product could not be saved'
            })
        }

        return res.status(200).json({
            staus: 'success',
            message: 'Product created successfully'
        })

    })
}

const toList = (req, res) => {
    let consultation = Product.find({});

    if (req.params.last) {
        consultation.limit(3);
    }

    consultation.sort({ fecha: -1 })
        .exec((error,products) => {
            if (error || !products) {
                return res.status(404).json({
                    status: "error",
                    message: "No products found!!"
                });
            }
            return res.status(200).send({
                status: "success",
                counter: products.length,
                products
            });
        });
}

const one = (req, res) => {

    let id = req.params.id;

    Product.findById(id, (error, product) => {
        if (error || !article) {
            return res.status(404).json({
                status: 'error',
                message: 'No product found!!'
            });

        }

        return res.status(200).send({
            status: 'success',
            product
        });

    });
}

const delet = (req, res) => {
    let productId = req.params.id
    Product.findByIdAndDelete({ _id: productId }, (error, productDelete) => {
        if (error || !articleDelete) {
            return res.status(404).json({
                status: 'error',
                message: 'Error delete product!!'
            });
        }

        return res.status(200).send({
            status: 'succes',
            article: productDelete,
            message: 'Productdeleted successfully'
        })
    })
}

const edit = (req, res) => {
    let productId = req.params.id

    

    Product.findOneAndUpdate({ _id: productId }, req.body, { new: true }, (error, updatedProduct) => {
        if (error || !updatedProduct) {
            return res.status(404).json({
                status: 'error',
                message: 'Error update product!!'
            });
        }
        return res.status(200).send({
            status: 'succes',
            article: updatedProduct,
            message: 'Product updated successfully'
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

        
        let productId = req.params.id;

        
        Product.findOneAndUpdate({ _id: productId }, { image: req.file.filename }, { new: true }, (error, updatedProduct) => {

            if (error || !updatedProduct) {
                return res.status(500).json({
                    status: "error",
                    message: "Failed to update"
                });
            }

            
            return res.status(200).json({
                status: "success",
                product: updatedProduct,
                file: req.file
            })
        });

    }

}

const image = (req, res) => {
    let file = req.params.file;
    let physical_route = "../images/products" + file;

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






module.exports = {
    create,
    toList,
    one,
    delet,
    edit,
    upLoad,
    image,
    

}