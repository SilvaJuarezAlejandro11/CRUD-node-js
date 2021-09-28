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
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bbc5776e448903',
    password: '89bd9f32',
    port: 3306,
    database: 'heroku_f127fc83d157a48'
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
