'use strict'

var Estudios = require("../models/estudios");
var validator = require('validator');


var controller = {

    // rutas utiles
    
    // Guardar estudios en la base de datos
    saveEstudios: (req, res) => {
        // Recoger parametros por post
        var params = req.body;

        // Validar datos (validator)
        try {
            var validate_titulo = !validator.isEmpty(params.titulo);
            var validate_tema = !validator.isEmpty(params.tema);
            var validate_autor = !validator.isEmpty(params.autor)
            var validate_contenido = !validator.isEmpty(params.contenido);
            
           

        } catch (error) {
            return res.status(500).send({
                message: 'Faltan datos por enviar'
            })
       }

        if (validate_titulo && validate_tema && validate_autor && validate_contenido) {

            // Crear el objeto a guardar
            var estudios = new Estudios();
            // Asignar valores
            estudios.titulo = params.titulo;
            estudios.tema = params.tema;
            estudios.autor = params.autor;
            estudios.contenido = params.contenido;


            // Guardar articulo 
            estudios.save((err, estudiosStored) => {

                if (err || !estudiosStored) {

                    estudios.save((err, estudiosStored) => {
                        if (err || !estudiosStored) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'EL estudio no se ha guardado'
                            });
                        }

                        // Devolver una respuesta
                        return res.status(200).send({
                            status: 'success',
                            estudios
                        });

                    });
                }
            });
        } else {
            return res.status(500).send({
                message: 'Los datos no son validos'
            })
        }

    },
    

    // Extraer estudios de la base de datos
    getEstudios: (req, res) => {

        var searchString = req.params.search
        

        // Find
        Estudios.find({ '$or': [
            { 'titulo': {'$regex': searchString, '$options': 'i'}},
            { 'tema': {'$regex': searchString, '$options': 'i'}}
        ]})
        .exec((err, Estudios) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los estudios biblicos'
                });
            }

            if(!Estudios){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontro resultados de la busqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                Estudios
            });
        });
    }



} // end controller

module.exports = controller;