'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3500;

mongoose.set('useFindAndModify'); // nos permite desactivar las funcionalidades antiguas de mongoose
mongoose.Promise = global.Promise; // nos permite usar las promesas 
mongoose.connect('mongodb://localhost:27017/api_rest_mi_app', {useNewUrlParser: true})
        .then(() => {
            console.log('Conexión a la base de datos correctamente!!!');

            // Crear servidor y que escuche peticiones HTTP
            app.listen(port, () => {
                console.log('Servidor corriendo en http://localhost:3500');
            });
            
});