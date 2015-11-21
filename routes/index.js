var express = require('express');
var router = express.Router();

// Cargar módulo de _sqlite3_
var sqlite3 = require('sqlite3');

// Cargar archivo de base de datos con los datos de prueba
var db = new sqlite3.Database('./db/CC_calificacionEmpresa.db');

// Cargar libreria de funciones de calificación de empresas
var libCalif = require('../lib/libCalificacionEmpresa.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/empresa/:id/:nombre/:direccion/:area', function(req, response) {
	libCalif.crearEmpresa(db, req.params.id, req.params.nombre, req.params.direccion, req.params.area);
	response.send("[INFO] Creacion de Empresa [Id: "+req.params.id+", Nombre: "+req.params.nombre+", Direccion: "+req.params.direccion+", Area: "+req.params.area+"] Finalizada con exito!!!");
});

router.put('/calificacion/:empresa/:alumno/:valor', function(req, response) {
	libCalif.crearCalificacion(db, req.params.empresa, req.params.alumno, req.params.valor);
	response.send("[INFO] Creacion de Calificacion [Empresa: "+req.params.empresa+", Alumno: "+req.params.alumno+", Valor: "+req.params.valor+"] Finalizada con exito!!!");
});

router.delete('/calificacion/:empresa/:alumno', function(req, response) {
	libCalif.eliminarCalificacion(db, req.params.empresa, req.params.alumno);
	response.send("[INFO] Eliminacion de Calificacion [Empresa: "+req.params.empresa+", Alumno: "+req.params.alumno+"] Finalizada con exito!!!");
});

router.get('/ranking', function(request, response) {
	libCalif.ranking(db);
	response.send("[INFO] Ranking de empresas listado correctamente!!!");
});

router.get('/calificaciones/:empresa', function(req, response) {
	libCalif.listarCalificaciones(db, req.params.empresa);
	response.send("[INFO] Calificaciones de la Empresa '"+req.params.empresa+"' listadas correctamente!!!");
});

module.exports = router;
