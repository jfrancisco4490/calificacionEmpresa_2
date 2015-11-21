// Librería para realizar operaciones de calificación de empresas
//--------------------------------------------------------------

// **Autor:** Abel Josué Francisco Agra
// **Versión:** _1.0_

// La presente librería incluye diversas funcionalidades que permiten asociar
// calificaciones o valoraciones numéricas a las empresas que ofertan prácticas a 
// estudiantes. Las calificaciones, en principio, las realizan estudiantes que
// han desarrollado prácticas profesionales en dichas instituciones.

// La valoración se realiza del uno (1) al cinco (5). Siendo uno (1) la calificación
// mínima (pero experiencia profesional durante las prácticas) y cinco (5) la máxima
// (excelente experiencia profesional).

// La presente librería constituye un ejercicio para la asignatura de Cloud Computing (CC),
// en el marco del Máster en Ingeniería Informática de la Universidad de Granada

module.exports = {

	// Permite el registro de una nueva empresa o institución
	// **Parámetros de Entrada:**
	// - **in_db**: identificador de la conexión a la base de datos
	// - **in_id**: identificador de la empresa (único)
	// - **in_nombre**: nombre completo de la intitución
	// - **in_direc**: ubicación de la sede principal de la compañía
	// - **in_area**: tipo de actividades a la que se dedica la empresa
	// **Salida:** _true_ si el registro de la nueva empresa se ejecutó correctamente, _false_ si no
	crearEmpresa : function(in_db, in_id,in_nombre,in_direc,in_area){
		in_db.run("INSERT INTO EMPRESA(identificador, nombre, direccion, area) VALUES ('"+in_id+"','"+in_nombre+"','"+in_direc+"','"+in_area+"')", function(err){
		
			if(err){
				// Mostrar Error Completo
				console.log("[ERR] Informacion completa del Error:");
				console.log("   [SYS] " + err.message);
				console.log("");
				return false;
			}
		});
		
		return true;
	},

	// Ordenar las empresas registradas según su valoración o calificaciones promedio.
	// El orden se realiza de mayor a menor
	// **Parámetros de Entrada:**
	// - **in_db**: identificador de la conexión a la base de datos
	ranking : function(in_db){
	
		console.log("[RES] Ranking de Empresas: ");
		in_db.each("SELECT E.identificador AS identificador, E.nombre AS nombre, E.direccion AS direccion, E.area AS area, AVG(C.valor) media FROM EMPRESA E, CALIFICACION C WHERE E.identificador = C.identificador GROUP BY C.identificador ORDER BY media DESC", function(err,row){
		
			console.log("      [RES] Id: '"+row.identificador+"', Nombre: '"+row.nombre+"', Direccion: '"+row.direccion+"', Area: '"+row.area+"', Media: "+row.media);
			
		});
		console.log("");
	},

	// Mostrar las calificaciones registradas para una determinada empresa o institución
	// **Parámetros de Entrada:**
	// - **in_db**: identificador de la conexión a la base de datos
	// - **in_id**: identificador de la empresa a consultar sus calificaciones
	listarCalificaciones : function(in_db, in_id){
		in_db.each("SELECT usuario AS usuario, valor AS calificacion FROM CALIFICACION WHERE identificador = '" + in_id +"' ORDER BY usuario", function(err, row){
		
			console.log("[RES] Empresa: '" + in_id);
			console.log("[RES] Usuario: '" + row.usuario + "' - Calificacion: " + row.calificacion);
		
		});
		
		console.log("");
	},

	// Registrar nueva calificacion o valoración de un usuario (estudiante) a una empresa
	// **Parámetros de Entrada:**
	// - **in_db**: identificador de la conexión a la base de datos
	// - **in_id**: identificador de la empresa a calificar
	// - **in_usr**: nombre de usuario del estudiante que realiza la valoración
	// - **in_valor**: calificación numérica (1 a 5) para la empresa
	// **Salida:** _true_ si el registro de la nueva calificación se ejecutó correctamente, _false_ si no
	crearCalificacion : function(in_db, in_id, in_usr, in_valor){
 
		in_db.run("INSERT INTO CALIFICACION(identificador, usuario, valor) VALUES ('"+in_id+"','"+in_usr+"','"+in_valor+"')", function(err) {

			// Verificar si el alumno ya ha dejado calificacion para dicha empresa				
			if(err){
				if(err.message.indexOf("SQLITE_CONSTRAINT: UNIQUE") > -1 &&
				   err.message.indexOf("CALIFICACION.usuario, CALIFICACION.identificador") > -1){
					
					// Mostrar Error Personalizado
					console.log("[ERR] El usuario '"+in_usr+"' ya ha registrado una calificacion para la empresa '"+in_id+"'");
				}
				
				// Mostrar Error Completo
				console.log("[ERR] Informacion completa del Error:");
				console.log("   [SYS] " + err.message);
				console.log("");
				
				return false;
			}
		});
		
		return true;
	},

	// Eliminar calificación particular asociada a una empresa o institución
	// **Parámetros de Entrada:**
	// - **in_db**: identificador de la conexión a la base de datos
	// - **in_id**: identificador de la empresa a eliminar su calificación
	// - **in_usr**: nombre de usuario del estudiante que realizó la valoración a eliminar
	// **Salida:** _true_ si la eliminación de la calificación se ejecutó correctamente
	eliminarCalificacion : function(in_db, in_id, in_usr){
		in_db.run("DELETE FROM CALIFICACION WHERE identificador = '"+ in_id + "' AND usuario = '" + in_usr + "'");
		
		return true;
	}
};