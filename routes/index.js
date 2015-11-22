// Controlador para funcionalidades de calificación de empresas
//-------------------------------------------------------------

// **Autor:** Abel Josué Francisco Agra
// **Versión:** _0.1_

// El presente controlador de rutas incluye funcionalidades para manejar y procesar solicitudes 
// _HTTP_ destinadas a la creación, eliminación o listado de calificaciones o valoraciones 
// realizadas por alumnos a empresas o instituciones.

// El presente programa constituye un ejercicio para la asignatura de Cloud Computing (CC),
// en el marco del Máster en Ingeniería Informática de la Universidad de Granada 2015-2016

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

  res.render('index', { titulo: 'Calificación de Empresas', descripcion: 'Operaciones para valorar a una determinada empresa o institución por parte de alumnos que han trabajado en estas.' });

});

// Para manejar solicitudes de creación de nuevas empresas
router.put('/empresa/:id/:nombre/:direccion/:area', function(req, response) {

	libCalif.crearEmpresa(db, req.params.id, req.params.nombre, req.params.direccion, req.params.area);
	response.send("[INFO] Creacion de Empresa [Id: "+req.params.id+", Nombre: "+req.params.nombre+", Direccion: "+req.params.direccion+", Area: "+req.params.area+"] Finalizada con exito!!!");

});

// Para manejar solicitudes de registro de nuevos alumnos
router.put('/alumno/:usr/:nombre/:apellido/:extra', function(req, response) {

	libCalif.crearAlumno(db, req.params.usr, req.params.nombre, req.params.apellido, req.params.extra);
	response.send("[INFO] Creacion de Alumno [Usuario: "+req.params.usr+", Nombres: "+req.params.nombre+", Apellidos: "+req.params.apellido+", Informacion Adicional: "+req.params.extra+"] Finalizada con exito!!!");

});

// Para gestionar solicitudes de registro de nuevas calificaciones
router.put('/calificacion/:empresa/:alumno/:valor', function(req, response) {

	libCalif.crearCalificacion(db, req.params.empresa, req.params.alumno, req.params.valor);
	response.send("[INFO] Creacion de Calificacion [Empresa: "+req.params.empresa+", Alumno: "+req.params.alumno+", Valor: "+req.params.valor+"] Finalizada con exito!!!");

});

// Para gestionar solicitudes de actualización de calificaciones
router.post('/calificacion/:empresa/:alumno/:valor', function(req, response) {

	libCalif.modificarCalificacion(db, req.params.empresa, req.params.alumno, req.params.valor);
	response.send("[INFO] Modificacion de Calificacion [Empresa: "+req.params.empresa+", Alumno: "+req.params.alumno+", Nuevo Valor: "+req.params.valor+"] Finalizada con exito!!!");

});

// Para manejar eliminación de calificaciones ya registradas
router.delete('/calificacion/:empresa/:alumno', function(req, response) {

	libCalif.eliminarCalificacion(db, req.params.empresa, req.params.alumno);
	response.send("[INFO] Eliminacion de Calificacion [Empresa: "+req.params.empresa+", Alumno: "+req.params.alumno+"] Finalizada con exito!!!");

});

// Para gestionar el listado de empresas mejor valoradas por alumnos
router.get('/ranking', function(request, response) {

	libCalif.ranking(db);
	response.send("[INFO] Ranking de empresas listado correctamente!!!");

});

// Para manejar el listado de calificaciones realizadas a una determinada empresa
router.get('/calificaciones/:empresa', function(req, response) {

	libCalif.listarCalificaciones(db, req.params.empresa);
	response.send("[INFO] Calificaciones de la Empresa '"+req.params.empresa+"' listadas correctamente!!!");

});

module.exports = router;