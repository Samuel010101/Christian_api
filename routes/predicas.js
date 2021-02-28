var express = require('express');

var PredicasController = require('../controllers/predicas');

var router = express.Router();

router.post('/datos-curso', PredicasController.datosCurso);
router.get('/test', PredicasController.test);
router.post('/save', PredicasController.save);
router.get('/search/:search', PredicasController.getPredicas);


module.exports = router;