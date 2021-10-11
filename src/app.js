const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('../config/db');

const app = express();

// Conectar Base de datos

connectDB();

//midlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Importando rutas
app.use('/', require('./routes/api/customer'));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engines', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Static files

app.use(express.static(path.join(__dirname, 'public')));

//Startign the servers
app.listen(app.get('port'), () => {
  console.log('Server en el puerto 3000');
});
