var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PredicasSchema = Schema({
    titulo: String, // representa la clasificacion
    tema: String, // tema en concreto del mensaje
    predicador: String,
    url: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Predicas', PredicasSchema)
// predicas --> guarda documentos de este tipo y con estructura dentro de la coleccion
