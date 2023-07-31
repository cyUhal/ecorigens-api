const {connection} = require ('./database/connection');
const express = require ('express');
const cors = require('cors')

console.log('App initialized');

connection();

const app = express();
const port = 3900;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//ver significado
app.set('view engine', 'pug')

const articlesRoutes = require('./routes/Articles');
app.use('/api/articles',articlesRoutes);

const UserRoutes = require('./routes/user');
app.use('/api/user',UserRoutes);


const groupRoutes = require('./routes/group');
 app.use('/api/group',groupRoutes);
 


app.listen(port, () => {
    console.log('Server running on the port:', port)
})