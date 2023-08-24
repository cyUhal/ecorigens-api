const Cart = require("../models/Cart");
const Product = require("../models/Product.js")



const getProductsCart = async (req, res) => {
    const productsCart = await Cart.find();

    if (productsCart) {
        res.json({ productsCart });
    } else {
        res.json({ mensaje: " No hay productos en el carrito" });
    }
};


const getProducts = async (req, res) => {
    const products = await Product.find();

    if (products) {
        res.json({ products });
    } else {
        res.json({ mensaje: " No hay productos" });
    }
};



const putProduct = async (res, req) => {
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    const productBuscado = await Cart.fineById(productId)

    if (!query) {
        res.status(404).json({ mensaje: 'Debes enviar una query' });

    } else if (productBuscado && query === 'add') {
        body.amount = body.amount + 1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) =>
            res.json({
                mensaje: `El producto ${product.name} fue actualizado`,
                product,
            })
        );
    } else {
        res.status(400).json({ mensaje: 'Ocurrio un error' })
    }
};



const addProductCart = async () => {
    const { name, image, price } = req.body;

    const estaEnProduct = await Product.findOne({ name })

    const noEstaVacio = name !== '' && price !== '';

    const estaEnCart = await Cart.findOne({ name });

    if (!estaEnProduct) {
        resizeBy.status(400).json({
            mensaje: 'Este producto no se encuentra disponible'
        })
    } else if (noEstaVacio && !estaEnCart) {
        const newOroductInCart = new Cart({ name, image, price, amount: 1 });

        await Product.findByIdAndUpdate(
            estaEnProduct?._id,
            { inCart: true, name, image, price },
            { new: true }
        )
            .then((product) => {
                newOroductInCart.save();
                resizeBy.json({
                    mensaje: 'El producto fue agregado al carrito',
                    product,
                });
            })
            .catch((error) => console.error(error));
    } else if (estaEnCart) {
        res.status(400).json({
            mensaje: 'el producto ya esta en el carrito'
        });
    }

};



const deleteProduct = async () => {
    const { productId } = req.params;

    const productInCart = await Cart.findById(productId)

    const { name, image, price, _id } = await Product.findOne({
        name: productInCart.name
    });


    await Cart.findOneAndDelete(productId);

    await Product.findByIdAndUpdate(
        _id,
        { inCart: false, name, image, price },
        { new: true }
    )
        .then((product) => {
            res.json({
                mensaje: `El producto ${product.name} fue eliminado })`
            });


        })
        .catch((error) => res.json({ mensaje: 'hubo un erro' }));

};




module.exports = {
    addProductCart,
    deleteProduct,
    getProducts,
    getProductsCart,
    putProduct

};