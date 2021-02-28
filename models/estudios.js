const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstudiosSchema = Schema({
    titulo: String, // representa la clasificacion
    tema: String, // tema en concreto del mensaje
    autor: String,
    contenido: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Estudios', EstudiosSchema)
// Estudios --> guarda documentos de este tipo y con estructura dentro de la coleccion
