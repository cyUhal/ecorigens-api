const {connection} = require ('./database/connection');
const express = require ('express');
const cors = require('cors')

console.log("App de node arrancada");
connection();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.send('API is running')
})

const rutas_productos = require("./routes/products");
app.use("/api/products", rutas_productos);

const rutas_cart = require("./routes/cart");
app.use("/api/cart", rutas_cart);


app.listen(port, () => {
    
    console.log("Servidor corriendo en el puerto" + port);
});



 