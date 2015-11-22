// Programa de Pruebas (con aserciones y _mocha_) para programa de evaluación de empresas por parte de alumnos
//------------------------------------------------------------------------------------------------------------

// **Autor:** Abel Josué Francisco Agra
// **Versión:** _0.1_

// El presente programa permite ejecutar algunas funcionalidades asociadas a la realización, eliminación y
// listado de calificaciones de alumnos a empresas

// Las pruebas incluidas se aplican, principalmente, sobre la implementación de las rutas (routes) del 
// proyecto

// El presente programa constituye un ejercicio para la asignatura de Cloud Computing (CC),
// en el marco del Máster en Ingeniería Informática de la Universidad de Granada

// Cargar modulos para definir aserciones/pruebas
var assert = require('assert');
var should = require('should');
var request = require('supertest');

// Cargar aplicación principal
var app = require('../app.js');

// Cargar funcionalidades de la ruta de operaciones de calificaciones de empresas
var calif = require('../routes/index.js');

// Grupo de pruebas sobre carga de librerías y módulos
describe('Calif_Carga_Tests', function(){

	// Verifica que se haya cargado correctamente la ruta con funcionalidades
	// de calificación de empresas
	describe('Auth_Carga_Calif', function(){
		it('Cargando ruta de calificación de Empresas...', function(){
			assert(calif, "Carga de Ruta Exitosa!!!");
		});

	});
});

// Grupo de pruebas sobre funcionalidades de calificación de empresas
describe('Calif_Func_Tests', function(){
	
	// Prueba de creación de nueva empresa
	describe("PUT Empresa", function() {
		it('Debería Crear Nueva Empresa', function (done) {
			request(app)
			.put('/empresa/Emp4/Empresa4/Direccion4/Area4')
			.expect(200,done)
			.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/Finalizada con exito/);
      			done();
      		});
		});
	});
	
	// Prueba de creación de nuevo alumno
	describe("PUT Alumno", function() {
		it('Debería Crear Nuevo Alumno', function (done) {
			request(app)
			.put('/alumno/Usr4/Nombre4/Apellidos4/Extra4')
			.expect(200,done)
			.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/Finalizada con exito/);
      			done();
      		});
		});
	});
	
	// Prueba de creación de nueva calificación
	describe("PUT Calificación", function() {
		it('Debería Crear Nueva Calificación', function (done) {
			request(app)
			.put('/calificacion/Emp4/Usr1/3')
			.expect(200,done)
			.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/Finalizada con exito/);
      			done();
      		});
		});
	});
	
	// Prueba de modificación de calificación
	describe("POST Calificación", function() {
		it('Debería Modificar Calificación', function (done) {
			request(app)
			.post('/calificacion/Emp4/Usr1/1')
			.expect(200,done)
			.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/Finalizada con exito/);
      			done();
      		});
		});
	});
	
	// Prueba de listado de ranking de empresas
	describe("GET Ranking", function() {
		it('Debería Listar Ranking de Empresas', function (done) {
			request(app)
			.get('/ranking')
			.expect(200,done)
			.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/listado correctamente/);
      			done();
      		});
		});
	});
	
	// Prueba de listado de calificaciones de empresa
	describe("GET Calificaciones", function() {
		it('Debería Listar Calificaciones de Empresa', function (done) {
			request(app)
			.get('/calificaciones/Emp4')
			.expect(200,done)
			.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/listadas correctamente/);
      			done();
      		});
		});
	});
	
	
	// Prueba de eliminación de calificación
	describe("DELETE Calificación", function() {
		it('Debería Eliminar Calificación', function (done) {
			request(app)
			.delete('/calificacion/Emp4/Usr1')
			.expect(200,done)
			.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/Finalizada con exito/);
      			done();
      		});
		});
	});
	
});