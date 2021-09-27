const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//Importando rutas
const customerRoutes = require('./routes/customer');



//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engines', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//midlewares


app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'Andres',
    password: 'ar428719ar428719',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({
    extended: false
}));

//Rutas
app.use('/',customerRoutes);

//Static files

app.use(express.static(path.join(__dirname, 'public')));

//Startign the servers
app.listen(app.get('port'), () => {
    console.log('Server en el puerto 3000');
});
