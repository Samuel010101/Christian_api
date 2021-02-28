var express = require('express');

var EstudiosController = require('../controllers/estudios');

var router = express.Router();


router.post('/estudio', EstudiosController.saveEstudios);
router.get('/estudio/:search', EstudiosController.getEstudios);

module.exports = router;