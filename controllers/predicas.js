'use strict'

var Predicas = require("../models/predicas");
var validator = require('validator');


var controller = {

    // rutas de pruebas
    datosCurso: (req, res) => {

        return res.status(200).send({
            curso: 'Master',
            autor: 'Sam',
            url: 'sam.com'
        });

    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador predicas'
        })
    },

    // rutas utiles
    // Metodo post para guardas las predicas en la BD
    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;

        // Validar datos (validator)
        try {
            var validate_titulo = !validator.isEmpty(params.titulo);
            var validate_tema = !validator.isEmpty(params.tema);
            var validate_predicador = !validator.isEmpty(params.predicador)
            var validate_url = !validator.isEmpty(params.url);
            
           

        } catch (error) {
            return res.status(500).send({
                message: 'Faltan datos por enviar'
            })
       }

        if (validate_titulo && validate_tema && validate_predicador && validate_url) {

            // Crear el objeto a guardar
            var predicas = new Predicas();
            // Asignar valores
            predicas.titulo = params.titulo;
            predicas.tema = params.tema;
            predicas.predicador = params.predicador;
            predicas.url = params.url;

            // Guardar articulo 
            predicas.save((err, predicasStored) => {

                if (err || !predicasStored) {

                    predicas.save((err, predicasStored) => {
                        if (err || !predicasStored) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'EL mensaje no se ha guardado'
                            });
                        }

                        // Devolver una respuesta
                        return res.status(200).send({
                            status: 'success',
                            predicas
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

    // Extraer predicas de la base de datos
    getPredicas: (req, res) => {

        var searchString = req.params.search

        // Find
        Predicas.find({ '$or': [
            { 'titulo': {'$regex': searchString, '$options': 'i'}},
            { 'tema': {'$regex': searchString, '$options': 'i'}}
        ]})
        .exec((err, Predicas) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver las predicas'
                });
            }

            if(!Predicas){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontro predicas con este tema'
                });
            }

            return res.status(200).send({
                status: 'success',
                Predicas
            });
        });
    }



} // end controller

module.exports = controller;