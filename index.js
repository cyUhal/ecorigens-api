const {connection} = require ('./database/connection');
const express = require ('express');
const cors = require('cors')

console.log('App initialized');

connection();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('view engine', 'pug')

const articlesRoutes = require('./routes/articles');
app.use('/api/articles',articlesRoutes);


const productsRoutes = require('./routes/products');
app.use('/api/products',productsRoutes);





app.listen(port, () => {
    console.log('Server running on the port:', port)
})